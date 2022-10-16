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

class PlayerSkin extends DataPacket {
    static NETWORK_ID = ProtocolInfo.PLAYER_SKIN;

    uuid;

    oldSkinName;

    newSkinName;

    skin;

    decodePayload() {
        this.uuid = this.readUUID();
        this.oldSkinName = this.readString();
        this.newSkinName = this.readString();
        this.skin = this.readSkin();
    }

    encodePayload() {
        this.writeUUID(this.uuid);
        this.writeString(this.oldSkinName);
        this.writeString(this.newSkinName);
        this.writeSkin(this.skin);
    }

    handle(handler) {
        return handler.handlePlayerSkin(this);
    }
}

module.exports = PlayerSkin;