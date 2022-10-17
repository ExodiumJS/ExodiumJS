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

const Command = require("./Command");
const StopCommand = require("./defaults/StopCommand");
const Player = require("../player/Player");
const ConsoleCommandSender = require("./ConsoleCommandSender");
const TextFormat = require("../utils/TextFormat");

class CommandMap {
    server = null;
    /**
     * @type {Map<string<Command>>}
     */
    commands = new Map();

    /**
     * CommandMap constructor
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
        this.register(new StopCommand());
    }

    /**
     *
     * @param {string} commandName
     * @return {boolean}
     */
    commandExists(commandName){
        return this.commands.has(commandName);
    }

    /**
     *
     * @param {Command} command
     */
    register(command){
        if (command instanceof Command){
            if (this.commandExists(command.getName())){
                return;
            }
            this.commands.set(command.getName(), command);
            if (command.getAliases().length > 0){
                command.getAliases().forEach(alias => {
                    if (this.commandExists(alias) === false){
                        this.commands.set(alias, command);
                    }
                });
            }
        }
    }

    /**
     *
     * @param {Command[]} commands
     */
    registerAll(commands){
        commands.forEach(command => {
           this.register(command);
        });
    }

    dispatch(sender, cmd){
        if(cmd === "")return;
        cmd = cmd.split(" ");
        let args = cmd;
        cmd = cmd.shift();

        if(this.commandExists(cmd)){
            let command = this.commands.get(cmd);
            if(sender instanceof ConsoleCommandSender || sender instanceof Player){
                command.execute(sender, args);
            }
        }else{
            if(cmd.trim() === ""){
                return;
            }
            sender.sendMessage(TextFormat.DARK_RED + "Unknown command. type 'help' to get list of commands");
        }
    }
}

module.exports = CommandMap;