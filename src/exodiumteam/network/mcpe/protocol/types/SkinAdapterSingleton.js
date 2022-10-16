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

const LegacySkinAdapter = require("./LegacySkinAdapter");

class SkinAdapterSingleton {
    static #instance = null;

    /**
     * @returns {LegacySkinAdapter}
     */
    static get(){
        if(this.#instance === null){
            this.#instance = new LegacySkinAdapter();
        }
        return this.#instance;
    }

    /**
     * @param adapter {LegacySkinAdapter}
     */
    static set(adapter){
        this.#instance = adapter;
    }
}

module.exports = SkinAdapterSingleton;