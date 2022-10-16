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

const DataPacket = require("./protocol/DataPacket");
const SkinAdapterSingleton = require("./protocol/types/SkinAdapterSingleton");

class PlayerSessionAdapter {
	/**
	 * @param player {Player}
	 */
	constructor(player) {
		/** @type {Server} */
		this.server = player.server;
		/** @type {RakNetInterface} */
		this.raknetAdapter = player.server.raknet;
		/** @type {Player} */
		this.player = player;
	}

	handleDataPacket(packet) {
		if (!packet instanceof DataPacket) {
			throw new Error("expected a packet instanceof DataPacket got " + packet);
		}

		if (!this.player.isConnected()) {
			return;
		}

		packet.decode();

		if (!packet.feos() && !packet.mayHaveUnreadBytes) {
			let remains = packet.buffer.slice(packet.offset);
			this.server.logger.debug("Still " + remains.length + " bytes unread in " + packet.getName() + ": 0x" + remains.toString("hex"));
		}

		packet.handle(this);
	}

	handleLogin(packet) {
		return this.player.handleLogin(packet);
	}

	handleRequestNetworkSettings(packet){
		return this.player.handleRequestNetworkSettings(packet);
	}

	handleText(packet) {
		return this.player.handleText(packet);
	}

	handleResourcePackClientResponse(packet) {
		return this.player.handleResourcePackClientResponse(packet);
	}

	handlePlayerSkin(packet) {
		return this.player.changeSkin(SkinAdapterSingleton.get().fromSkinData(packet.skin), packet.oldSkinName, packet.newSkinName);
	}

	/**
	 * @return {String}
	 */
	toString() {
		return this.player.getName() !== "" ? this.player.getName() : this.player.ip + ":" + this.player.port;
	}
}

module.exports = PlayerSessionAdapter;
