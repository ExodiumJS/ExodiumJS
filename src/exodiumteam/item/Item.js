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

const ItemIdentifier = require("./utils/ItemIdentifier");
const Item_Map = require("../resources/item_id_map.json");

class Item {
    /** @type {ItemIdentifier} */
    identifier;
    networkId;
    name;
    nbt = null;
    count = 1;
    durability = this.getMaxDurability();

    /**
     *
     * @param {ItemIdentifier} identifier
     * @param {string} name
     */
    constructor(identifier, name) {
        this.identifier = identifier;
        this.name = name;
        this.networkId = Item_Map[name];
        console.log(this);
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.identifier.id;
    }

    getMeta(){
        return this.identifier.meta;
    }

    isTool(){
        return false;
    }

    isArmorPiece(){
        return false;
    }

    getMaxStackSize(){
        return 64;
    }

    onClick(){

    }

    getMaxDurability() {
        return 0;
    }

    getEnchantmentLevel(enchantment){

    }
}

module.exports = Item;