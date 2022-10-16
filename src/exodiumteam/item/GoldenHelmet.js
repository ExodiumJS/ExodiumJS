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

const Armor = require("./Armor");
const ItemIdentifier = require("./utils/ItemIdentifier");

class GoldenHelmet extends Armor{

    constructor() {
        super(new ItemIdentifier(314, 0), "minecraft:golden_helmet");
    }

    getMaxDurability() {
        return 77;
    }

    getArmorDefensePoints() {
        return 2;
    }
}

module.exports = GoldenHelmet;