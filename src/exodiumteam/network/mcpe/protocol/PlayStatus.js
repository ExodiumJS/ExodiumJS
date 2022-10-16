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

class PlayStatus extends DataPacket {
	static NETWORK_ID = ProtocolInfo.PLAY_STATUS_PACKET;

	/** @type {number} */
	status;

	static LOGIN_SUCCESS = 0;

	static LOGIN_FAILED_CLIENT = 1;

	static LOGIN_FAILED_SERVER = 2;

	static PLAYER_SPAWN = 3;

	static LOGIN_FAILED_INVALID_TENANT = 4;

	static LOGIN_FAILED_VANILLA_EDU = 5;

	static LOGIN_FAILED_EDU_VANILLA = 6;

	canBeSentBeforeLogin = true;

	decodePayload() {
		this.status = this.readIntBE();
	}

	encodePayload() {
		this.writeIntBE(this.status);
	}
}

module.exports = PlayStatus;
