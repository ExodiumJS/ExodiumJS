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

const { RakNetServer, InternetAddress, Frame, ReliabilityTool } = require("bbmc-raknet");
const GamePacket = require("./mcpe/protocol/GamePacket");
const PlayerList = require("../player/PlayerList");
const Logger = require("../utils/MainLogger");
const PacketPool = require("./mcpe/protocol/PacketPool");
const Config = require("../utils/Config");
const BinaryStream = require("bbmc-binarystream");
const RakNetHandler = require("./handler/RakNetHandler");

class RakNetInterface {
	/** @type MainLogger */
	logger;
	/** @type PlayerList */
	players;
	/** @type {RakNetServer, EventEmitter} */
	raknet;
	/** @type Config */
	settings;
	/** @type Server */
	server;

	constructor(server) {
		this.server = server;
		this.settings = new Config("settings.json", Config.JSON);
		this.logger = new Logger();
		this.raknet = new RakNetServer(new InternetAddress(this.settings.get("interface"), this.settings.get("port"), this.settings.get("ipv")), 11);
		this.players = new PlayerList();
		PacketPool.init();
		this.logger.setDebuggingLevel(this.settings.get("debug_level"));
	}

	queuePacket(player, packet, immediate) {
		if (this.players.hasPlayer(player)) {
			if (!packet.isEncoded) {
				packet.encode();
			}
			if (packet instanceof GamePacket) {
				console.log(packet);
				let frame = new Frame();
				frame.reliability = ReliabilityTool.UNRELIABLE;
				frame.isFragmented = false;
				frame.stream = new BinaryStream(packet.buffer);
				if (this.raknet.hasConnection(player.ip)) {
					let connection = this.raknet.getConnection(player.ip);
					connection.addToQueue(frame);
				}
			} else {
				this.server.batchPackets([player], [packet], true, immediate);
			}
		}
	}

	handle() {
		RakNetHandler.updatePong(this);

		this.raknet.on('connect', (connection) => {
			RakNetHandler.handlePlayerConnection(this, connection);
		});

		this.raknet.on('disconnect', (address) => {
			RakNetHandler.handlePlayerDisconnection(this, address);
		});

		this.raknet.on('packet', (stream, connection) => {
			RakNetHandler.handlePackets(this, stream, connection);
		});
	}

	close(player) {
		if (this.players.hasPlayer(player)) {
			this.raknet.removeConnection(player.ip);
			this.players.removePlayer(player.ip + ":" + player.port);
		}
	}

	shutdown() {
		this.raknet.isRunning = false;
	}
}

module.exports = RakNetInterface;
