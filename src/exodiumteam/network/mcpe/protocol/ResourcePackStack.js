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

class ResourcePackStack extends DataPacket {
	static NETWORK_ID = ProtocolInfo.RESOURCE_PACK_STACK_PACKET;

	/** @type {boolean} */
	mustAccept = false;

	/** @type {any} */
	behaviorPackStack = [];
	/** @type {any} */
	resourcePackStack = [];

	/** @type {string} */
	baseGameVersion = ProtocolInfo.MINECRAFT_VERSION;
	/** @type {boolean} */
	experimentsPreviouslyUsed = false;

	canBeSentBeforeLogin = true;

	decodePayload() {
		this.mustAccept = this.readBool();
		let behaviorPackCount = this.readVarInt();
		while (behaviorPackCount-- > 0) {
			this.readString();
			this.readString();
			this.readString();
		}

		let resourcePackCount = this.readVarInt();
		while (resourcePackCount-- > 0) {
			this.readString();
			this.readString();
			this.readString();
		}

		this.baseGameVersion = this.readString();
		let experimentsCount = this.readIntLE();
		while (experimentsCount-- > 0) {
			this.readString();
			this.readBool();
		}
		this.experimentsPreviouslyUsed = this.readBool();
	}

	encodePayload() {
		this.writeBool(this.mustAccept);

		this.writeVarInt(this.behaviorPackStack.length);
		this.behaviorPackStack.forEach(() => {
			this.writeString("");
			this.writeString("");
			this.writeString("");
		});

		this.writeVarInt(this.resourcePackStack.length);
		this.resourcePackStack.forEach(() => {
			this.writeString("");
			this.writeString("");
			this.writeString("");
		});

		this.writeString(this.baseGameVersion);
		this.writeIntLE(0); // experiments count
		this.writeBool(this.experimentsPreviouslyUsed);
	}
}

module.exports = ResourcePackStack;
