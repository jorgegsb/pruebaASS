import Board from "./board.js";
import Knight from "./knight.js";
import Pawn from "./pawn.js";
import Bishop from "./bishop.js";
import King from "./king.js";
import Queen from "./queen.js";
import Rook from "./rook.js";
import CanvasDrawEngine from "./canvas_draw_engine.js";
import Player from "./player.js";


//this class will control all the logic and the process of the game
export default class GameController {
    constructor() {
            this.WIDTH = 800;
            this.HEIGHT = 800;
            //this variable is used to take control over the previous cell and the pieces inside
            this._previousCell = null;
            // storage the selected cells here
            this._selectedCells = [];

            //create the canvas and linked to the chess HTML label
            this._CanvasDrawEngine = new CanvasDrawEngine("chess", this.WIDTH, this.HEIGHT);
            //initial state of the game
            this.initialGame();
            // this._CanvasDrawEngine.CANVAS.addEventListener("mousemove", this._dropPiece);
            //events that makes the pieces can move and interact each-other      
            this._CanvasDrawEngine.CANVAS.addEventListener("mousedown", this._PickPiece);
            this._CanvasDrawEngine.CANVAS.addEventListener("mouseup", this._dropPiece);
            this.player1 = new Player(this._CanvasDrawEngine.PIECETHEME.white);
            this.player1.turn = true;
            this.player2 = new Player(this._CanvasDrawEngine.PIECETHEME.black);
        }
        //set the selected cells to false and clear them
    clearSelections() {
        this._selectedCells.forEach((cell) => cell.isSelected(false));
        this._selectedCells = [];
    }
    clearAvailableMoves() {
            this._board.LOGICBOARD.forEach((file) => {
                file.forEach((cell) => {
                    cell.setAvialableMove(false);
                })
            })
        }
        //storage the mouse offset coordinates
    _mouseCoordinatesCell(offsetX, offsetY) {
        const x = Math.floor(offsetX / this._board.CELL_WIDTH);
        const y = Math.floor(offsetY / this._board.CELL_HEIGHT);
        return [x, y];
    }

    _PickPiece(event) {
        this.clearSelections();
        if (this._previousCell) return;
        const { offsetX, offsetY } = event;
        const [x, y] = this._mouseCoordinatesCell(offsetX, offsetY);
        const selectedCell = this._board.LOGICBOARD[y][x];
        if (!selectedCell.piece) return;
        //turn system
        if (this.player1.turn && selectedCell.piece.color === this.player2.PieceColor) return;
        if (this.player2.turn && selectedCell.piece.color === this.player1.PieceColor) return;
        //show the possible movements of the piece
        selectedCell.piece.availableMovements([y, x], this._board.LOGICBOARD);
        this._previousCell = selectedCell;
        this._selectedCells.push(selectedCell);
        selectedCell.isSelected(true);
        this._CanvasDrawEngine.render(this._board);
    }
    _dropPiece(event) {
        if (!this._previousCell) return;
        const { offsetX, offsetY } = event;
        const [x, y] = this._mouseCoordinatesCell(offsetX, offsetY);
        const selectedCell = this._board.LOGICBOARD[y][x];
        //this make that if you drop the piece in the same cell dont loose the piece
        if (this._previousCell === selectedCell) {
            this._previousCell = null;
            this.clearAvailableMoves();
            this._CanvasDrawEngine.render(this._board);
            this.clearSelections();
            return;
        }

        if (!selectedCell.avialableMove) {
            this._previousCell = null;
            this.clearAvailableMoves();
            this._CanvasDrawEngine.render(this._board);
            return;
        }
        //Castling 
        if (this._previousCell.piece.type === "k") {
            const kingPiece = this._previousCell.piece;
            if (!kingPiece.moved) {
                kingPiece.castling([y, x], this._board.LOGICBOARD)
            }
        }

        selectedCell.setPiece(this._previousCell.piece);
        //if the piece is moved we set this to true, it´s necessary for some pieces like pawn
        this._previousCell.piece.moveCount += 1;
        this._selectedCells.push(selectedCell);
        this._previousCell.setPiece(null);
        this._previousCell = null;
        selectedCell.isSelected(true);
        this.clearAvailableMoves();
        this._CanvasDrawEngine.render(this._board);
        //turn system
        if (this.player1.turn) {
            this.player2.turn = true;
            this.player1.turn = false;
        } else {
            this.player2.turn = false;
            this.player1.turn = true;
        }
    }

    _createLightPawns() {
        this._lightPawn1 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn2 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn3 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn4 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn5 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn6 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn7 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightPawn8 = new Pawn(this._CanvasDrawEngine.PIECETHEME.white);
    }


    _createDarkPawns() {
        this._darkPawn1 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn2 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn3 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn4 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn5 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn6 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn7 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkPawn8 = new Pawn(this._CanvasDrawEngine.PIECETHEME.black);
    }



    _createLightKnights() {
        this._lightKnight1 = new Knight(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightKnight2 = new Knight(this._CanvasDrawEngine.PIECETHEME.white);
    }



    _createDarkKnights() {
        this._darkKnight1 = new Knight(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkKnight2 = new Knight(this._CanvasDrawEngine.PIECETHEME.black);
    }



    _createLightBishops() {
        this._lightBishop1 = new Bishop(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightBishop2 = new Bishop(this._CanvasDrawEngine.PIECETHEME.white);
    }




    _createDarkBishops() {
        this._darkBishop1 = new Bishop(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkBishop2 = new Bishop(this._CanvasDrawEngine.PIECETHEME.black);
    }




    _createLightRooks() {
        this._lightRook1 = new Rook(this._CanvasDrawEngine.PIECETHEME.white);
        this._lightRook2 = new Rook(this._CanvasDrawEngine.PIECETHEME.white);
    }



    _createDarkRooks() {
        this._darkRook1 = new Rook(this._CanvasDrawEngine.PIECETHEME.black);
        this._darkRook2 = new Rook(this._CanvasDrawEngine.PIECETHEME.black);
    }



    _createLightQueen() {
        this._lightQueen = new Queen(this._CanvasDrawEngine.PIECETHEME.white);
    }




    _createDarkQueen() {
        this._darkQueen = new Queen(this._CanvasDrawEngine.PIECETHEME.black);
    }


    _createLightKing() {
        this._lightKing = new King(this._CanvasDrawEngine.PIECETHEME.white);

    }


    _createDarkKing() {
        this._darkKing = new King(this._CanvasDrawEngine.PIECETHEME.black);
    }



    _InsertMayorLightPieces() {
        this._board.setCell(0, 0, this._lightRook1);
        this._board.setCell(0, 1, this._lightKnight1);
        this._board.setCell(0, 2, this._lightBishop1);
        this._board.setCell(0, 3, this._lightKing);
        this._board.setCell(0, 4, this._lightQueen);
        this._board.setCell(0, 5, this._lightBishop2);
        this._board.setCell(0, 6, this._lightKnight2);
        this._board.setCell(0, 7, this._lightRook2);
    }

    _InsertLightPawns() {
        this._board.setCell(1, 0, this._lightPawn1);
        this._board.setCell(1, 1, this._lightPawn2);
        this._board.setCell(1, 2, this._lightPawn3);
        this._board.setCell(1, 3, this._lightPawn4);
        this._board.setCell(1, 4, this._lightPawn5);
        this._board.setCell(1, 5, this._lightPawn6);
        this._board.setCell(1, 6, this._lightPawn7);
        this._board.setCell(1, 7, this._lightPawn8);
    }

    _InsertMayorDarkPieces() {
        this._board.setCell(7, 0, this._darkRook1);
        this._board.setCell(7, 1, this._darkKnight1);
        this._board.setCell(7, 2, this._darkBishop1);
        this._board.setCell(7, 3, this._darkKing);
        this._board.setCell(7, 4, this._darkQueen);
        this._board.setCell(7, 5, this._darkBishop2);
        this._board.setCell(7, 6, this._darkKnight2);
        this._board.setCell(7, 7, this._darkRook2);
    }
    _InsertDarkPawns() {

        this._board.setCell(6, 0, this._darkPawn1);
        this._board.setCell(6, 1, this._darkPawn2);
        this._board.setCell(6, 2, this._darkPawn3);
        this._board.setCell(6, 3, this._darkPawn4);
        this._board.setCell(6, 4, this._darkPawn5);
        this._board.setCell(6, 5, this._darkPawn6);
        this._board.setCell(6, 6, this._darkPawn7);
        this._board.setCell(6, 7, this._darkPawn8);
    }
    _createBoard() {
        this._board = new Board(this.WIDTH, this.HEIGHT);
        this._PickPiece = this._PickPiece.bind(this);
        this._dropPiece = this._dropPiece.bind(this);
    }

    initialGame() {
        this._createBoard();
        this._createDarkBishops();
        this._createDarkKing();
        this._createDarkKnights();
        this._createDarkQueen();
        this._createDarkPawns();
        this._createDarkRooks();
        this._createLightBishops();
        this._createLightKing();
        this._createLightKnights();
        this._createLightPawns();
        this._createLightQueen();
        this._createLightRooks();
        this._InsertLightPawns();
        this._InsertDarkPawns();
        this._InsertMayorDarkPieces();
        this._InsertMayorLightPieces();
        this._CanvasDrawEngine.render(this._board);
    }

}
