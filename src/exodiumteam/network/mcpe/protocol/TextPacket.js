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

class TextPacket extends DataPacket {
	static NETWORK_ID = ProtocolInfo.TEXT_PACKET;

	static TYPE_RAW = 0;
	static TYPE_CHAT = 1;
	static TYPE_TRANSLATION = 2;
	static TYPE_POPUP = 3;
	static TYPE_JUKEBOX_POPUP = 4;
	static TYPE_TIP = 5;
	static TYPE_SYSTEM = 6;
	static TYPE_WHISPER = 7;
	static TYPE_ANNOUNCEMENT = 8;
	static TYPE_JSON_WHISPER = 9;
	static TYPE_JSON = 10;
	static TYPE_JSON_ANNOUNCEMENT = 11;

	/** @type {number} */
	type;
	/** @type {boolean} */
	needsTranslation = false;
	/** @type {string} */
	sourceName = "";
	/** @type {string} */
	message = "";
	/** @type {any} */
	parameters = [];
	/** @type {string} */
	xboxUserId = "";
	/** @type {string} */
	platformChatId = "";

	canBeSentBeforeLogin = true;

	decodePayload() {
		this.type = this.readByte();
		this.needsTranslation = this.readBool();
		switch (this.type) {
			case TextPacket.TYPE_CHAT:
			case TextPacket.TYPE_WHISPER:
			case TextPacket.TYPE_ANNOUNCEMENT:
				this.sourceName = this.readString();
				break;
			case TextPacket.TYPE_RAW:
			case TextPacket.TYPE_TIP:
			case TextPacket.TYPE_SYSTEM:
			case TextPacket.TYPE_JSON_WHISPER:
			case TextPacket.TYPE_JSON:
			case TextPacket.TYPE_JSON_ANNOUNCEMENT:
					this.message = this.readString();
				break;
			case TextPacket.TYPE_TRANSLATION:
			case TextPacket.TYPE_POPUP:
			case TextPacket.TYPE_JUKEBOX_POPUP:
				this.message = this.readString();
				let count = this.readVarInt();
				for (let i = 0; i < count; ++i) {
					this.parameters.push(this.readString());
				}
				break;
		}

		this.xboxUserId = this.readString();
		this.platformChatId = this.readString();
	}

	encodePayload() {
		this.writeByte(this.type);
		this.writeBool(this.needsTranslation);
		switch (this.type) {
			case TextPacket.TYPE_CHAT:
			case TextPacket.TYPE_WHISPER:
			case TextPacket.TYPE_ANNOUNCEMENT:
				this.writeString(this.sourceName);
				break;
			case TextPacket.TYPE_RAW:
			case TextPacket.TYPE_TIP:
			case TextPacket.TYPE_SYSTEM:
			case TextPacket.TYPE_JSON_WHISPER:
			case TextPacket.TYPE_JSON:
			case TextPacket.TYPE_JSON_ANNOUNCEMENT:
				this.writeString(this.message);
				break;
			case TextPacket.TYPE_TRANSLATION:
			case TextPacket.TYPE_POPUP:
			case TextPacket.TYPE_JUKEBOX_POPUP:
				this.writeString(this.message);
				this.writeVarInt(this.parameters.length);
				this.parameters.forEach((p) => this.writeString(p));
				break;
		}

		this.writeString(this.xboxUserId);
		this.writeString(this.platformChatId);
	}

	handle(handler) {
		return handler.handleText(this);
	}
}

module.exports = TextPacket;
