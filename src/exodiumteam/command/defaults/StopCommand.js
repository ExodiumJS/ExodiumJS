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

const Command = require("../Command");

class StopCommand extends Command {

    constructor() {
        super("stop", "Stops the server", "exodium.command.stop", ["shutdown"]);
    }

    execute(sender, args) {
        if (sender.hasPermission(this.getPermission())){
            //sender.getServer().shutdown();
            sender.getServer().lockItem();
        }
    }
}
module.exports = StopCommand;