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

const Item = require("./Item");

class ItemFactory {
    /** @type {ItemFactory|null} */
    static instance = null;

    static list = new Array(65536);

    constructor() {
        if (ItemFactory.instance === null){
            ItemFactory.instance = this;
        }
    }

    static getInstance(){
        if (ItemFactory.instance === null){
            return new ItemFactory();
        }
        return ItemFactory.instance;
    }

    /**
     * @param {Item} item
     * @param {boolean} override
     */
    registerItem(item, override = false) {
        if (item instanceof Item) {
            let id = item.getId();
            if (!override && this.isRegistered(id)) {
                console.log("Trying to overwrite an already registered item");
                return;
            }

            ItemFactory.list[this.getListOffset(id)] = Object.assign(Object.create(Object.getPrototypeOf(item)), item);
            console.log(item);
        }
    }

    isRegistered(id) {
        if (id < 256) {
            //return BlockFactory.isRegistered(id); TODO
        }
        return ItemFactory.list[this.getListOffset(id)] !== null;
    }

    getListOffset(id) {
        if (id < -0x8000 || id > 0x7fff) {
            console.log("ID must be in range " + -0x8000 + " - " + 0x7fff);
        }
        return id & 0xffff;
    }

}

module.exports = ItemFactory;