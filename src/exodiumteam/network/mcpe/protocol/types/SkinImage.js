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

class SkinImage {

    height;
    width;
    data;

    constructor(height, width, data) {
        if(height < 0 || width < 0){
            throw new Error("Unknown height and width");
        }
        let expected, actual;
        if((expected = height * width * 4) !== (actual = data.length)){
            throw new Error(`Data should be ${expected} got ${actual}`);
        }
        this.height = height;
        this.width = width;
        this.data = data;
    }

    static fromLegacy(data){
        switch (data.length){
            case 64 * 32 * 4:
                return new SkinImage(32, 64, data);
            case 64 * 64 * 4:
                return new SkinImage(64, 64, data);
            case 128 * 128 * 4:
                return new SkinImage(128, 128, data);
        }
        throw new Error("Unknown size");
    }

    getHeight(){
        return this.height;
    }

    getWidth(){
        return this.width;
    }

    getData(){
        return this.data;
    }
}

module.exports = SkinImage;
