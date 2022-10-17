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

const Item = require("./Item");
const GoldenHelmet = require("./GoldenHelmet");

class ItemFactory {

    server;

    constructor(server) {
        this.list = Array.apply(null, Array(65556)).map(function () {});
        this.server = server;
        this.registerItem(new GoldenHelmet());
    }

    /**
     * @param {string} name
     * @return Item
     */
    readAsura(name){
        return this.list[name];
    }

    /**
     * @param {Item} item
     * @param {boolean} override
     */
    registerItem(item, override = false) {
        if (item instanceof Item) {
            let id = item.getId();
            if (!override && this.isRegistered(id + ":" + item.getMeta())) {
                console.log("Trying to overwrite an already registered item");
                return;
            }

            this.list[id + ":" + item.getMeta()] = item;
        }
    }

    isRegistered(id) {
        /*if (id < 256) {
            //return BlockFactory.isRegistered(id); TODO
        }*/
        return this.list[id] ?? false;
    }
}

module.exports = ItemFactory;