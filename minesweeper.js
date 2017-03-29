document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = createBoard(4, 4);

function createBoard(x, y) {
    var board = {};
    board.cells = [];
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            board.cells.push({
                row: i,
                col: j,
                isMine: true,
                isMarked: false,
                hidden: true
            })
        }
    }
    return board;
}


function startGame(cell) {

    // Don't remove this function call: it makes the game work!
    lib.initBoard()

    for (var i = 0; i < 9; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }

    document.addEventListener('click', checkForWin);
    document.addEventListener('contextmenu', checkForWin);
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    //   lib.displayMessage('You win!')

    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMarked === true && board.cells[i].isMine == true) {
            lib.displayMessage('You win!');
        }
    }
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var i = 0; i < surrounding.length; i++) {
        if (surrounding[i].isMine == true) {
            count += 1;
        }
    }
    return count;
}
