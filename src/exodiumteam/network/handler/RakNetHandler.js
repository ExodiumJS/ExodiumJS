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

const Player = require("../../player/Player");
const ProtocolInfo = require("../mcpe/protocol/ProtocolInfo");
const GamePacket = require("../mcpe/protocol/GamePacket");

class RakNetHandler {

    static handlePlayerConnection(inter, connection){
        let player = new Player(inter.server, connection.address, connection.port);
        inter.players.addPlayer(connection.address.toString(), player);
    }

    static handlePlayerDisconnection(inter, address){
        if (inter.players.has(address.toString())) {
            inter.players.getPlayer(address.toString()).close('client disconnect', true);
            inter.players.removePlayer(address.toString());
        }
    }

    static updatePong(inter){
        let interval = setInterval(() => {
            if(inter.raknet.isRunning === true){
                inter.raknet.message = "MCPE;" + inter.settings.get("motd") + ";" + ProtocolInfo.CURRENT_PROTOCOL + ";" + ProtocolInfo.MINECRAFT_VERSION + ";" + inter.server.getOnlinePlayers().length + ";" + inter.settings.get("maxplayers") + ";" + inter.raknet.serverGUID.toString() + ";";
            }else{
                clearInterval(interval);
            }
        });
    }

    static handlePackets(inter, stream, connection){
        console.log(connection.address.toString() + ": Packet -> 0x" + stream.readUnsignedByte().toString(16));
        let player = inter.players.getPlayer(connection.address.toString());
        let pk = new GamePacket();
        pk.buffer = stream.buffer;
        pk.decode();
        pk.handle(player.getSessionAdapter());
    }
}

module.exports = RakNetHandler;
