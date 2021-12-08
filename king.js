import Piece from "./piece.js";
//manage the piece King ande everything related to this piece
export default class King extends Piece {

    constructor(color) {
        super(color, ["♚", "♔"], "k")
    }


    castling(position, LOGICBOARD) {
        const [x, y] = position;
        if (x === 7 && y === 5) {
            const rookCell = LOGICBOARD[7][7];
            LOGICBOARD[7][4].setPiece(rookCell.piece);
            rookCell.setPiece(null);
        } else if (x === 0 && y === 5) {
            const rookCell = LOGICBOARD[0][7];
            LOGICBOARD[0][4].setPiece(rookCell.piece);
            rookCell.setPiece(null);
        } else if (x === 7 && y === 1) {
            const rookCell = LOGICBOARD[7][0];
            LOGICBOARD[7][2].setPiece(rookCell.piece);
            rookCell.setPiece(null);
        } else if (x === 0 && y === 1) {
            const rookCell = LOGICBOARD[0][0];
            LOGICBOARD[0][2].setPiece(rookCell.piece);
            rookCell.setPiece(null);
        }
    }
    availableMovements(position, LOGICBOARD) {
        const [y, x] = position;

        const KingMov = [
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
        KingMov.forEach((mov) => {
            const [dirX, dirY] = mov;
            const cell = this.getCellfromCords([x + (1 * dirY), y + (1 * dirX)], LOGICBOARD);
            if (this.ValidCell(cell)) cell.setAvialableMove(true);
        });

        if (this.moveCount > 0) return;
        //castling movement
        const castlingRightDirectionCell1 = this.getCellfromCords([x + 3, y], LOGICBOARD);
        const castlingRightDirectionCell2 = this.getCellfromCords([x + 1, y], LOGICBOARD);
        const castlingRightDirectionCell3 = this.getCellfromCords([x + 2, y], LOGICBOARD);
        const castlingRightDirectionRook = this.getCellfromCords([x + 4, y], LOGICBOARD);
        //RightCastling movement
        if ((!castlingRightDirectionCell1.piece) &&
            (!castlingRightDirectionCell2.piece) &&
            (castlingRightDirectionRook.piece) &&
            (castlingRightDirectionRook.piece.type === "r") &&
            (castlingRightDirectionRook.piece.moveCount === 0)) {
            castlingRightDirectionCell3.setAvialableMove(true)
        };
        const castlingLeftDirectionCell1 = this.getCellfromCords([x - 2, y], LOGICBOARD);
        const castlingLeftDirectionCell2 = this.getCellfromCords([x - 1, y], LOGICBOARD);
        const castlingLeftDirectionRook = this.getCellfromCords([x - 3, y], LOGICBOARD);
        //LeftCastling movement
        if ((!castlingLeftDirectionCell1.piece) &&
            (!castlingLeftDirectionCell2.piece) &&
            (castlingLeftDirectionRook.piece) &&
            (castlingLeftDirectionRook.piece.type === "r") &&
            (castlingRightDirectionRook.piece.moveCount === 0)) {
            castlingLeftDirectionCell1.setAvialableMove(true);
        }

    }
}