/**********************************************************\
 *                                                        *
 *   _____               _ _                     _ ____   *
 *  | ____|_  _____   __| (_)_   _ _ __ ___     | / ___|  *
 *  |  _| \ \/ / _ \ / _` | | | | | '_ ` _ \ _  | \___ \  *
 *  | |___ >  < (_) | (_| | | |_| | | | | | | |_| |___) | *
 *  |_____/_/\_\___/ \__,_|_|\__,_|_| |_| |_|\___/|____/  *
 *                                                        *
 *          This file is licensed under the GNU           *
 *          General Public License 3. To use or           *
 *          modify it you must accept the terms           *
 *          of the license.                               *
 *              ___________________________               *
 *              \ @author ExodiumJS Team /                *
 \**********************************************************/

const GamePacket = require("./network/mcpe/protocol/GamePacket");
const Config = require("./utils/Config");
const RakNetInterface = require("./network/RakNetInterface");
const Logger = require("./utils/MainLogger");
const ConsoleCommandReader = require("./command/ConsoleCommandReader");
const CommandMap = require("./command/CommandMap");
const fs = require("fs");
const ItemFactory = require("./item/ItemFactory");
const GoldenHelmet = require("./item/GoldenHelmet");
const {Str,Short, Int, NBTNetworkBinaryStream, Compound} = require("bbmc-nbt");
const ItemSerializer = require("./item/utils/ItemSerializer");

const version = "0.0.1";

class Server {
	/** @type Logger */
	logger;
	/** @type RakNetInterface */
	raknet;
	/** @type {CommandMap|null} */
	commandMap = null;
	/** @type {Server|null} */
	static instance = null;
	/** @type {ItemFactory} */
	itemFactory = null;

	constructor(path) {
		if (!Server.instance) {
			Server.instance = this;
		}
		let start_time = Date.now();
		this.logger = new Logger();
		this.getLogger().info("Starting server...");
		this.getLogger().info("Loading settings.json");
		this.path = path;
		if (!fs.existsSync("settings.json")) {
			let options = {
				"motd": "Exodium Server",
				"interface": "0.0.0.0",
				"port": 19132,
				"ipv": 4,
				"maxplayers": 20,
				"debug_level": 0,
				"onlinemode": true
			};
			fs.writeFileSync(this.path.data + "settings.json", JSON.stringify(options));
		}
		this.getLogger().info("This server is running ExodiumJS " + version);
		this.getLogger().info("ExodiumJS is distributed under GPLv3 License");
		this.raknet = new RakNetInterface(this);
		if (this.raknet.raknet.isRunning === true) {
			this.raknet.handle();
			this.raknet.raknet.socket.on("listening", () => {
				this.getLogger().info("Server listened on " + new Config("settings.json", Config.JSON).get("interface") + ":" + new Config("settings.json", Config.JSON).get("port"))
				this.getLogger().info("Done in (" + (Date.now() - start_time) + "ms).");
			});
		}
		this.commandMap = new CommandMap(this);
		new ConsoleCommandReader(this);
		this.itemFactory = new ItemFactory(this);
	}

	static getInstance(){
		if (Server.instance === null){
			throw new Error("Instance is null");
		}
		return Server.instance;
	}

	// TODO REMOVE THIS
	lockItem() {
		let nbt2 = new NBTNetworkBinaryStream();
		nbt2.writeCompoundTag(new Compound("data", [
			new Str("Id", "minecraft:golden_helmet"),
			new Int("Count", 1),
			new Short("Meta", 0),
			new Short("Damage", 0)
		]));
		//console.log(nbt2.readCompoundTag("data"));
		let item = (new ItemSerializer(nbt2)).nbtDeserialize();
		console.log(item);
	}


	/**
	 * @param players {Player[]}
	 * @param packets {DataPacket[]}
	 * @param forceSync {Boolean}
	 * @param immediate {Boolean}
	 */
	batchPackets(players, packets, forceSync = false, immediate = false) {
		let targets = [];
		players.forEach((player) => {
			if (player.isConnected()){
				targets.push(this.raknet.players.getPlayerAddrNPort(player));
			}
		});

		if (targets.length > 0) {
			let pk = new GamePacket();

			packets.forEach((packet) => pk.addPacket(packet));

			if (!forceSync && !immediate) {
				this.broadcastPackets([pk], targets, false);
			} else {
				this.broadcastPackets([pk], targets, immediate);
			}
		}
	}

	/**
	 * @returns {MainLogger}
	 */
	getLogger() {
		return this.logger;
	}

	/**
	 * @returns {void}
	 */
	shutdown() {
		this.raknet.shutdown();
		process.exit(1);
	}

	/**
	 * @return {Array}
	 */
	getOnlinePlayers() {
		return Array.from(this.raknet.players.values());
	}

	getCommandMap(){
		return this.commandMap;
	}

	/**
	 * @param packets {DataPacket[]}
	 * @param targets {Player[]}
	 * @param immediate {Boolean}
	 */
	broadcastPackets(packets, targets, immediate) {
		packets.forEach(pk => {
			if (!pk.isEncoded) {
				pk.encode();
			}

			if (immediate) {
				targets.forEach((id) => {
					if (this.raknet.players.has(id)) {
						this.raknet.players.getPlayer(id).sendDataPacket(pk, true);
					}
				});
			} else {
				targets.forEach((id) => {
					if (this.raknet.players.has(id)) {
						this.raknet.players.getPlayer(id).sendDataPacket(pk);
					}
				});
			}
		});
	}

	/**
	 * @param targets {Player[]}
	 * @param packet {DataPacket}
	 */
	broadcastPacket(targets, packet){
		packet.encode();
		this.batchPackets(targets, [packet]);
	}

	/**
	 * @param message {String}
	 * @return {number}
	 */
	broadcastMessage(message) {
		let players = this.getOnlinePlayers();
		players.forEach(players => {
			players.sendMessage(message)
		});
		return players.length;
	}
}

module.exports = Server;
