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

class ItemIdentifier {
    id;
    meta;

    /**
     * @param {int} id
     * @param {number} meta
     */
    constructor(id, meta) {
        if(id < -0x8000 || id > 0x7fff){ //signed short range
            throw new Error("ID must be in range " + -0x8000 + " - " + 0x7fff);
        }
        this.id = id;
        this.meta = meta !== -1 ? meta & 0x7FFF : -1;
    }
}

module.exports = ItemIdentifier;