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

const ConsoleCommandSender = require("./ConsoleCommandSender");
const Player = require("../player/Player");

class Command {

    /**
     *
     * @param {string} name
     * @param {string} description
     * @param {string} usage
     * @param {string} permission
     * @param {string[]} aliases
     */
    constructor(name, description, usage, permission = "", aliases = []) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.permission = permission;
        this.aliases = aliases;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getUsage(){
        return this.usage;
    }

    getPermission(){
        return this.permission;
    }

    /**
     * @return {string[]}
     */
    getAliases(){
        return this.aliases;
    }

    /**
     *
     * @param {ConsoleCommandSender|Player} sender
     * @param {string[]} args
     */
    execute(sender, args) {
        if (!sender instanceof Player && !sender instanceof ConsoleCommandSender) {
            throw new Error("Command sender not of type CommandSender.");
        }
    }

}

module.exports = Command;