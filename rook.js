import Piece from "./piece.js";
//manage the piece Rook ande everything related to this piece
export default class Rook extends Piece {
    constructor(color) {
        super(color, ["♜", "♖"], "r")
    }

    availableMovements(position, LOGICBOARD) {

        const RookMov = [
            //up
            [-1, 0],
            //down
            [1, 0],
            //Right
            [0, 1],
            //left
            [0, -1]
        ]

        RookMov.forEach((mov) => {
            this.pieceDirection(position, mov, LOGICBOARD);
        });





    }
}