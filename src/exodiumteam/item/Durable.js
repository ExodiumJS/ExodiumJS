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

class Durable extends Item {

    /** @type {number}*/
    damage = 0;
    /** @type {boolean} */
    unbreakable = false;

    isUnbreakable() {
        return this.unbreakable;
    }

    /**
     * @param {boolean} value
     */
    setUnbreakable(value) {
        this.unbreakable = value;
    }

    /**
     * @param {number} amount
     * @return {boolean}
     */
    applyDamage(amount) {
        if (this.isUnbreakable() || this.isBroken()) {
            return false;
        }
        amount -= this.getUnbreakingDamageReduction(amount);
        this.damage = Math.min(this.damage + amount, this.getMaxDurability());
        if (this.isBroken()) {
            this.pop()
        }
        return true;
    }

    setDamage(damage) {
        if (damage < 0 || damage > this.getMaxDurability()) {
            throw new Error("Damage must be in range 0 - ".this.getMaxDurability());
        }
        this.damage = damage;
        return this;
    }

    getUnbreakingDamageReduction(amount) {
        let unbreakingLevel = this.getEnchantmentLevel(VanillaEnchantments.UNBREAKING());
        if (unbreakingLevel > 0) {
            let negated = 0;
            let chance = 1 / (unbreakingLevel + 1);
            for (let i = 0; i < amount; ++i) {
                if (Math.random() > chance) {
                    negated++;
                }
            }
            return negated;
        }
        return 0;
    }

    getMaxDurability(){
        return 100;
    }

    isBroken(){
        return this.damage >= this.getMaxDurability();
    }
}
module.exports = Durable;