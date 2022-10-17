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
 \*********************************************************/

class ConsoleCommandSender{

    /**
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
    }

    getServer(){
        return this.server;
    }

    /**
     * @param {string} permission
     * @return {boolean}
     */
    hasPermission(permission){
        return true;
    }

    sendMessage(message){
        this.getServer().getLogger().info(message);
    }
}

module.exports = ConsoleCommandSender;