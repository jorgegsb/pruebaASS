import Piece from "./piece.js";
//manage the piece Bishop ande everything related to this piece
export default class Bishop extends Piece {
    constructor(color) {
        super(color, ["♝", "♗"], "b")
    }


    availableMovements(position, LOGICBOARD) {
        const bishopMov = [
            //down/Right
            [1, 1],
            //down/left
            [1, -1],
            //up/right
            [-1, 1],
            //up/right
            [-1, -1],
        ]
        bishopMov.forEach((mov) => {
            this.pieceDirection(position, mov, LOGICBOARD);
        });

    }
}