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
const assert = require("assert");
const Zlib = require("zlib");
const BinaryStream = require("../../NetworkBinaryStream");
const MainLogger = require("../../../utils/MainLogger");
const PacketPool = require("./PacketPool");

class GamePacket extends DataPacket {
	static NETWORK_ID = 0xfe;

	logger = new MainLogger();
	payload = new BinaryStream();
	compressionLevel = 7;
	canBeBatched = false;
	canBeSentBeforeLogin = true;

	decodeHeader() {
		let pid = this.readUnsignedByte();
		this.logger.info(pid);
		assert(pid === this.constructor.NETWORK_ID);
	}

	decodePayload() {
		let data = this.readRemaining();
		this.payload = new BinaryStream(data);
	}

	encodeHeader() {
		this.writeUnsignedByte(this.constructor.NETWORK_ID);
	}

	encodePayload() {
		let buf = Zlib.deflateRawSync(this.payload.buffer, {level: this.compressionLevel});
		this.write(buf);
	}

	addPacket(packet) {
		if (!packet.canBeBatched) {
			throw new Error(packet.getName() + " cant be batched");
		}
		if (!packet.isEncoded) {
			packet.encode();
		}

		this.payload.writeVarInt(packet.buffer.length);
		this.payload.write(packet.buffer);
	}

	getPackets() {
		let pks = [];
		while (!this.payload.feos()) {
			let id = this.payload.readVarInt();
			let read = this.payload.read(id);
			console.log(id);
			console.log(read);
			pks.push(read);
			//pks.push(this.payload.read(this.payload.readVarInt()));
		}
		console.log(pks);
		return pks;
	}

	handle(handler) {
		if (this.payload.buffer.length === 0) {
			return false;
		}
		this.getPackets().forEach((buf) => {
			console.log("buff0: "+ buf[0]);
			let pk = PacketPool.getPacket(buf[0]);
			console.log("MINECRAFT PACKET: 0x" + buf.slice(0, 1).toString("hex"));
			if (pk instanceof DataPacket) {
				if (!pk.canBeBatched) {
					throw new Error("Received invalid " + pk.getName() + " inside GamePacket");
				}
				pk.buffer = buf;
				pk.offset = 1;
				console.log(pk);
				handler.handleDataPacket(pk);
			} else {
				this.logger.debug("uff: "+buf);
			}
		});
		return true;
	}
}

module.exports = GamePacket;
