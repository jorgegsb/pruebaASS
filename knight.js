import Piece from "./piece.js";
//manage the piece Knight ande everything related to this piece
export default class Knight extends Piece {
    constructor(color) {
        super(color, ["♞", "♘"], "n")
    }

    availableMovements(position, LOGICBOARD) {
        const [y, x] = position;

        const knightMov = [
            [x - 1, y - 2],
            [x + 1, y - 2],
            [x + 2, y - 1],
            [x + 2, y + 1],
            [x + 1, y + 2],
            [x - 1, y + 2],
            [x - 2, y + 1],
            [x - 2, y - 1],
        ]

        knightMov.forEach((movement) => {
            const cell = this.getCellfromCords(movement, LOGICBOARD);
            if (this.ValidCell(cell)) cell.setAvialableMove(true);
        })
    }
}