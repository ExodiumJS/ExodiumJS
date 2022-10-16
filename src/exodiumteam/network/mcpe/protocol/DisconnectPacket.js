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

const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class DisconnectPacket extends DataPacket {
	static NETWORK_ID = ProtocolInfo.DISCONNECT_PACKET;

	hideDisconnectionScreen = false;
	message = "";

	canBeSentBeforeLogin = true;

	decodePayload() {
		this.hideDisconnectionScreen = this.readBool();
		if (!this.hideDisconnectionScreen) {
			this.message = this.readString();
		}
	}

	encodePayload() {
		this.writeBool(this.hideDisconnectionScreen);
		if (!this.hideDisconnectionScreen) {
			this.writeString(this.message);
		}
	}
}

module.exports = DisconnectPacket;
