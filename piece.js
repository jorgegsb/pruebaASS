//class uset to make inheritance on the child-pieces and establish the common atributes and methods of the child-pieces
export default class Piece {
    constructor(color, sprite, type) {
        this.color = color;
        this.sprite = sprite;
        this.type = type;
        this.moveCount = 0;
    }

    getCellfromCords(position, LOGICBOARD) {
        const [x, y] = position;
        const rank = LOGICBOARD[y] || [];
        const cell = rank[x];
        return cell;
    }

    pieceDirection(position, direction, LOGICBOARD) {
        const [x, y] = position;
        const [dirX, dirY] = direction;
        for (let i = 1; i <= LOGICBOARD.length; i += 1) {
            const cell = this.getCellfromCords([y + (i * dirY), x + (i * dirX)], LOGICBOARD);
            if (!cell) break;
            if (cell.piece && cell.piece.color === this.color) break;
            cell.setAvialableMove(true);
            if (cell.piece) break;
        }
    }
    ValidCell(cell) {
        return cell && !(cell.piece && cell.piece.color === this.color);
    }
    availableMovements(position, LOGICBOARD) {
        throw new Error(`Missing avaliable movements in  ${this.type}`);
    }

}