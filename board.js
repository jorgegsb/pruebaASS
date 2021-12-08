import Cell from "./cell.js";
//this class takes care everything related with the board and it´s managements
export default class Board {
    //the constuctor need a width y a height to establish the board dimensions
    //other usefull constants are the number of files 
    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.FILES = 8;
        this.RANKS = 8;
        this.CELL_WIDTH = this.WIDTH / this.FILES;
        this.CELL_HEIGHT = this.HEIGHT / this.RANKS;
        //board initialization
        this.LOGICBOARD = [];
        for (let x = 0; x < this.FILES; x++) {
            this.LOGICBOARD[x] = [];
            for (let y = 0; y < this.RANKS; y++) {
                this.LOGICBOARD[x][y] = new Cell(null);
            }
        }


    }

    set width(width) {
        if (!Number.isInteger(width)) {
            throw TypeError("introduce an integer")
        } else {
            this._width = width;
        }
    }


    set height(height) {
        if (!Number.isInteger(height)) {
            throw TypeError("introduce an integer")
        } else {
            this._height = height;
        }
    }
    get height() {
        return this._height;

    }
    get width() {
        return this._width;
    }

    get cellWidth() {
        return this.CELL_WIDTH;
    }

    get cellHeight() {
        return this.CELL_HEIGHT;
    }
    //creating and setting  a cell
    setCell(x, y, piece) {
        const cell = this.LOGICBOARD[x][y];
        cell.setPiece(piece);
    }



}