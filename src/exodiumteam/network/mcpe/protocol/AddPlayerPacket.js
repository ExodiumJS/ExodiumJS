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
const Vector3 = require("../../../math/Vector3");
const UUID = require("../../../utils/UUID");
const DeviceOS = require("./types/DeviceOS");

class AddPlayerPacket extends DataPacket{
    static NETWORK_ID = ProtocolInfo.ADD_PLAYER_PACKET;

    uuid;
    /** @type {string} */
    username;
    /** @type {number} */
    actorRuntimeId;
    /** @type {string} */
    platformChatId = "";
    position = Vector3.zero();
    motion = Vector3.zero();
    /** @type {number} */
    pitch = 0.0;
    /** @type {number} */
    yaw = 0.0;
    /** @type {number} */
    headYaw = 0.0;
    //Item
    item;
    /** @type {number} */
    gameMode;
    /**
     * @var MetadataProperty[]
     * @phpstan-var array<int, MetadataProperty>
     */
    /** @type {MetadataProperty[]} */
    metadata = [];

    abilitiesPacket;

    /** @type {EntityLink[]} */
    links = [];
    deviceId = ""; //TODO: fill player's device ID (???)
    buildPlatform = DeviceOS.UNKNOWN;

    decodePayload(){
        this.uuid = this.readUUID();
        this.username = this.readString();
        this.actorRuntimeId = this.readActorRuntimeId();
        this.platformChatId = this.readString();
        this.position = this.readVector3();
        this.motion = this.readVector3();
        this.pitch = this.readFloatLE();
        this.yaw = this.readFloatLE();
        this.headYaw = this.readFloatLE();
        this.item = ItemStackWrapper::read($in);
        this.gameMode = this.readVarInt();
        this.metadata = this.readEntityMetadata();

        this.abilitiesPacket = new UpdateAbilitiesPacket();
        this.abilitiesPacket.decodePayload();

        let linkCount = this.readUnsignedIntBE();
        for(let i = 0; i < linkCount; ++i){
            this.links[i] = this.readEntityLink();
        }
        this.deviceId = this.getString();
        this.buildPlatform = this.readIntLE();
    }

    encodePayload() {
        this.writeUUID(this.uuid);
        this.writeString(this.username);
        this.writeActorRuntimeId(this.actorRuntimeId);
        this.writeString(this.platformChatId);
        this.writeVector3(this.position);
        this.writeVector3Nullable(this.motion);
        this.writeFloatLE(this.pitch);
        this.writeFloatLE(this.yaw);
        this.writeFloatLE(this.headYaw);
        this.item.write(this);
        this.writeVarInt(this.gameMode);
        this.writeEntityMetadata(this.metadata);

        this.abilitiesPacket.encodePayload();
        this.writeUnsignedIntBE(Math.count(this.links));
        this.links.forEach(link => {
            this.writeEntityLink(link);
        });
        this.writeString(this.deviceId);
        this.writeIntLE(this.buildPlatform);
    }

    handle(handler){
    return handler.handleAddPlayer(this);
}
}