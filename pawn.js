import Piece from "./piece.js";
//manage the piece Pawn and everything related to this piece
export default class Pawn extends Piece {
    constructor(color) {
        super(color, ["♟", "♙"], " ")
    }


    availableMovements(position, LOGICBOARD) {
        const Ydirection = this.color === "#000000" ? -1 : +1;
        const [x, y] = position;
        for (let i = 1; i <= (this.moveCount > 0 ? 1 : 2); i += 1) {
            const cell = this.getCellfromCords([y, this.color === "#000000" ? x - i : x + i], LOGICBOARD);
            if (cell.piece) break;
            cell.setAvialableMove(true);

        }
        //take piece conditions
        for (let i = 0; i < 2; i++) {
            const takeCell = this.getCellfromCords([y + (i ? 1 : -1), x + (1 * Ydirection)], LOGICBOARD);
            if (takeCell && takeCell.piece && takeCell.piece.color !== this.color) {
                takeCell.setAvialableMove(true);
            }
        }

    }

}