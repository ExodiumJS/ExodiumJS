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

class NetworkSettingsPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.NETWORK_SETTINGS_PACKET;

    static COMPRESS_NOTHING = 0;
    static COMPRESS_EVERYTHING = 1;

    /** @type {number} */
    compressionThreshold;
    /** @type {number} */
    compressionAlgorithm;
    /** @type {boolean} */
    enableClientThrottling;
    /** @type {number} */
    clientThrottleThreshold;
    /** @type {number} */
    clientThrottleScalar;

    canBeSentBeforeLogin = true;

    decodePayload() {
        this.compressionThreshold = this.readUnsignedShortBE();
        this.compressionAlgorithm = this.readUnsignedShortBE();
        this.enableClientThrottling = this.readBool();
        this.clientThrottleThreshold = this.readByte();
        this.clientThrottleScalar = this.readFloatBE()
        console.log(this.compressionThreshold);
        console.log(this.compressionAlgorithm);
        console.log(this.enableClientThrottling);
        console.log(this.clientThrottleThreshold);
        console.log(this.clientThrottleScalar);
    }

    encodePayload() {
        this.writeUnsignedShortBE(this.compressionThreshold);
        this.writeUnsignedShortBE(this.compressionAlgorithm);
        this.writeBool(this.enableClientThrottling);
        this.writeByte(this.clientThrottleThreshold);
        this.writeFloatBE(this.clientThrottleScalar);
    }
}

module.exports = NetworkSettingsPacket;