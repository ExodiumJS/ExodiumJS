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

class PersonaPieceTintColor {
    static PIECE_TYPE_PERSONA_EYES = "persona_eyes";
    static PIECE_TYPE_PERSONA_HAIR = "persona_hair";
    static PIECE_TYPE_PERSONA_MOUTH = "persona_mouth";

    #pieceType;

    #colors;

    constructor(pieceType, colors) {
        this.#pieceType = pieceType;
        this.#colors = colors;
    }

    getPieceType(){
        return this.#pieceType;
    }

    getColors(){
        return this.#colors;
    }
}

module.exports = PersonaPieceTintColor;