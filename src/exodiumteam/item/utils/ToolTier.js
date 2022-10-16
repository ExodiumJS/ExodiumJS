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

class ToolTier {
    static WOOD = new ToolTier("wood", 1, 60, 5, 2);
    static GOLD = new ToolTier("gold", 2, 33, 5, 12);
    static STONE = new ToolTier("stone", 3, 132, 6, 4);
    static IRON = new ToolTier("iron", 4, 251, 7, 6);
    static DIAMOND = new ToolTier("diamond", 5, 1562, 8, 8);

    name;
    harvestLevel;
    maxDurability;
    baseAttackPoints;
    baseEfficiency;

    constructor(name, harvestLevel, maxDurability, baseAttackPoints, baseEfficiency){
        this.name = name;
        this.harvestLevel = harvestLevel;
        this.maxDurability = maxDurability;
        this.baseAttackPoints = baseAttackPoints;
        this.baseEfficiency = baseEfficiency;
    }

}

module.exports = ToolTier;