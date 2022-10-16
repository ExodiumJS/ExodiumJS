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

const Player = require("./Player");

class PlayerList extends Map {
	/**
	 * @param id {String}
	 * @param player {Player}
	 */
	addPlayer(id, player) {
		CheckTypes([Player, player]);
		this.set(id, player);
	}

	/**
	 * @param id {String}
	 * @returns {Player}
	 */
	getPlayer(id) {
		return this.has(id) ? this.get(id) : null;
	}

	/**
	 * @param player {Player}
	 */
	hasPlayer(player) {
		return Array.from(this.values()).indexOf(player) !== -1;
	}

	/**
	 * @param player {Player}
	 */
	getPlayerAddrNPort(player) {
		return Array.from(this.keys())[Array.from(this.values()).indexOf(player)];
	}

	/**
	 * @param id {String}
	 */
	removePlayer(id) {
		return this.delete(id);
	}
}

module.exports = PlayerList;
