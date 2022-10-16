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

const Tool = require("./Tool");
const ToolTier = require("./utils/ToolTier");

class TieredTool extends Tool{
    /** @type {ToolTier} */
    tier;

    /**
     * @param {ItemIdentifier} identifier
     * @param {string} name
     * @param {ToolTier} tier
     */
    constructor(identifier, name, tier) {
        super(identifier, name);
        this.tier = tier;
    }

    getMaxDurability() {
        return this.tier.maxDurability;
    }

    getBaseMiningEfficiency(){
        return this.tier.baseEfficiency;
    }

    getFuelTime(){
        if(this.tier === ToolTier.WOOD){
            return 200;
        }

        return 0;
    }
}

module.exports = TieredTool;