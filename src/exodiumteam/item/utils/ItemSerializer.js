const {Str} = require("bbmc-nbt");
const Server = require("../../Server");
const Item = require("../Item");

class ItemSerializer {

     constructor(nbt) {
         this.nbt = nbt;
     }

    /**
     * @return {Item}
     */
    nbtDeserialize() {
        let nbt = this.nbt.readCompoundTag("data");
        if (nbt.getTag("Id") === null || nbt.getTag("Meta") === null) {
            //return ; TODO air
            console.log("Error");
        }
        let item = null;
        let count = nbt.getTag("Count");
        let meta = nbt.getTag("Meta") === null ? 0 : nbt.getTag("Meta").value;
        let idTag = nbt.getTag("Id");
        if (idTag instanceof Str) {
            let ifac = Server.getInstance().itemFactory;
            item = ifac.list[idTag.value + ":" + meta];
            item.count = count;
        } else {
            throw new Error("Item CompoundTag ID must be an instance of Str, " + idTag +" given");
        }

        let itemNBT = nbt.getTag("Tag");
        if (itemNBT !== null) {
            item.nbt = itemNBT;
        }

        return item;
    }
}

module.exports = ItemSerializer;