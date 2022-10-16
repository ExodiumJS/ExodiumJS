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

const Login = require("./Login");
const PlayStatus = require("./PlayStatus");
const ResourcePackClientResponse = require("./ResourcePackClientResponse");
const ResourcePacksInfo = require("./ResourcePacksInfo");
const ResourcePackStack = require("./ResourcePackStack");
const StartGame = require("./StartGame");
const CreativeContent = require("./CreativeContent");
const BiomeDefinitionList = require("./BiomeDefinitionList");
const Text = require("./TextPacket");
const SetTitle = require("./SetTitle");
const DisconnectPacket = require("./DisconnectPacket");
const PlayerSkin = require("./PlayerSkin");
const SetLocalPlayerAsInitialized = require("./SetLocalPlayerAsInitialized");
const AvailableActorIdentifiers = require("./AvailableActorIdentifiers");
const ClientToServerHandshakePacket = require("./ClientToServerHandshakePacket");
const NetworkSettingsPacket = require("./NetworkSettingsPacket");
const ServerToClientHandshakePacket = require("./ServerToClientHandshakePacket");
const RequestNetworkSettingsPacket = require("./RequestNetworkSettingsPacket");

class PacketPool{
	static #pool = {};

	static init() {
		this.registerPacket(Login);
		this.registerPacket(PlayStatus);
		this.registerPacket(ResourcePacksInfo);
		this.registerPacket(ResourcePackClientResponse);
		this.registerPacket(ResourcePackStack);
		this.registerPacket(StartGame);
		this.registerPacket(BiomeDefinitionList);
		this.registerPacket(CreativeContent);
		this.registerPacket(Text);
		this.registerPacket(SetTitle);
		this.registerPacket(DisconnectPacket);
		this.registerPacket(SetLocalPlayerAsInitialized);
		this.registerPacket(PlayerSkin);
		this.registerPacket(ClientToServerHandshakePacket);
		this.registerPacket(NetworkSettingsPacket);
		this.registerPacket(ServerToClientHandshakePacket);
		this.registerPacket(AvailableActorIdentifiers);
		this.registerPacket(RequestNetworkSettingsPacket);
	}

	static registerPacket(packet) {
		if(packet.NETWORK_ID in this.#pool){
			throw new Error(`Trying to register already registered packet, packetid=${packet.NETWORK_ID}`);
		}
		this.#pool[packet.NETWORK_ID] = packet;
	}

	static getPacket(id) {
		console.log(id);
		let packet = this.#pool[id];
		return typeof this.#pool[id] !== "undefined" ? new packet : false;
	}

}

module.exports = PacketPool;
