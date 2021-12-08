//this class take care of the drawing part of the chess game(drawing the pieces,board...)
export default class CanvasDrawEngine {
    //In the constructor we need and id to set in the HTML file and havr control over the canvas
    //width for the canvas and height to get a 2D place where we can paint everething
    constructor(id, width, height) {
        this._width = width;
        this._height = height;
        //creation and setting the canvas on the HTML file
        this.CANVAS = document.createElement("canvas");
        this.CANVAS.width = width;
        this.CANVAS.height = height;
        this.context = this.CANVAS.getContext("2d");
        document.getElementById(id).appendChild(this.CANVAS);
        //colors of the pieces and the board cells
        this.THEME = {
            dark: "#4d236d",
            light: "#e6e6fa",

        }
        this.PIECETHEME = {
            black: "#000000",
            white: "#FFFFFF"
        }
    }

    // the render methods take care of render and paint everithing on the canvas needs a board to render
    render(board) {
        for (let x = 0; x < board.FILES; x++) {
            for (let y = 0; y < board.RANKS; y++) {
                // using the even and odd to paint the squares of the board
                ((x + y) % 2) ? this.context.fillStyle = this.THEME.dark: this.context.fillStyle = this.THEME.light;
                this.context.fillRect(x * board.CELL_WIDTH, y * board.CELL_HEIGHT, board.CELL_WIDTH, board.CELL_HEIGHT);
                //draw the border of the Cell
                const cell = board.LOGICBOARD[y][x];
                if (cell.selected) {
                    this.context.fillStyle = "#00ffff";
                    this.context.globalAlpha = 0.7;
                    this.context.fillRect(x * board.CELL_WIDTH, y * board.CELL_HEIGHT, board.CELL_WIDTH, board.CELL_HEIGHT);
                    this.context.globalAlpha = 1;
                }

                if (cell.avialableMove) {
                    this.context.fillStyle = "#59981A";
                    this.context.globalAlpha = 0.9;
                    this.context.beginPath();
                    this.context.arc(x * board.CELL_WIDTH + board.CELL_WIDTH / 2,
                        y * board.CELL_HEIGHT + board.CELL_HEIGHT / 2,
                        16, 0, 2 * Math.PI);
                    this.context.fill();
                    this.context.globalAlpha = 1;
                }
                //draw the pieces on the board

                const piece = cell.piece;
                if (piece) {
                    this.context.fillStyle = piece.color;
                    this.context.textBaseline = "middle";
                    this.context.textAlign = "center";
                    this.context.font = "72px Arial";
                    this.context.fillStyle = piece.color;
                    this.context.fillText(piece.sprite[0], x * board.CELL_WIDTH + board.CELL_WIDTH / 2, y * board.CELL_HEIGHT + board.CELL_HEIGHT / 2);
                    this.context.fillStyle = this.PIECETHEME.black;
                    this.context.fillText(piece.sprite[1], x * board.CELL_WIDTH + board.CELL_WIDTH / 2, y * board.CELL_HEIGHT + board.CELL_HEIGHT / 2);
                }
            }
        }

    }
}