import Piece from "./piece.js";
//manage the piece Queen ande everything related to this piece
export default class Queen extends Piece {
    constructor(color) {
        super(color, ["♛", "♕"], "q")
    }


    availableMovements(position, LOGICBOARD) {
        const QueenMov = [
            //down/Right
            [1, 1],
            //down/left
            [1, -1],
            //up/right
            [-1, 1],
            //up/right
            [-1, -1],
            //up
            [-1, 0],
            //down
            [1, 0],
            //Right
            [0, 1],
            //left
            [0, -1]

        ];
        QueenMov.forEach((mov) => {
            this.pieceDirection(position, mov, LOGICBOARD);
        });
    }
}