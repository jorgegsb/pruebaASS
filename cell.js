// Cell class take care of setting pieces in there for establish a place where the pieces can interact 

export default class Cell {
    constructor(piece) {
            this.piece = piece;
            this.selected = false;
            this.avialableMove = false;
        }
        //if its selected so you can control the piece inside of the cell
    isSelected(selected) {
        this.selected = selected;
    }
    setPiece(piece) {
        this.piece = piece;
    }
    setAvialableMove(avialable) {
        this.avialableMove = avialable;
    }


}