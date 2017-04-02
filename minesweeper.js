document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board;

function createBoard(size) {
    var result = {};
    result.cells = [];
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            result.cells.push({
                row: i,
                col: j,
                isMine: false,
                isMarked: false,
                hidden: true
            })
        }
    }
    setMines(result);
    return result;
}

function setMines(aBoard) {
    var minesToSet = Math.floor(aBoard.cells.length / 4);
    while (minesToSet > 0) {
        var cellIndex = Math.floor(Math.random() * (aBoard.cells.length));
        if (!aBoard.cells[cellIndex].isMine) {
            aBoard.cells[cellIndex].isMine = true;
            minesToSet--;
        }
    }
}

function startGame(cell) {

    // Don't remove this function call: it makes the game work!
    resetGame();
    document.addEventListener('click', checkForWin);
    document.addEventListener('click', checkForLose);
    document.addEventListener('click', playClickSound);
    document.addEventListener('contextmenu', checkForWin);
    document.addEventListener('contextmenu', playMarkSound);
    document.getElementById('resetButton').addEventListener('click', resetGame);
}

function resetGame() {
    var boardNode = document.getElementsByClassName('board')[0];
    boardNode.innerHTML = '';
    board = createBoard(5);
    for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }
    lib.initBoard();
}

function playSound(id) {
    var audio = document.getElementById(id);

    // Stop the sound in case it's already playing
    audio.pause();
    audio.currentTime = 0;

    audio.play();
}

function playClickSound() {
    playSound('click');
}

function playMarkSound() {
    playSound('mark');
}
// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForLose() {
    function checkCell(array) {
        return (array.isMine == true && array.hidden === false);
    }
    if (board.cells.some(checkCell)) {
        playSound('loss');
    };
}

function checkForWin() {
    function checkCell(array) {
        return ((array.isMine == true && array.isMarked == true) || (array.hidden === false && array.isMine == false));
    }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    //   lib.displayMessage('You win!')
    if (board.cells.every(checkCell)) {
        lib.displayMessage('You win!');
        playSound('win');
    };
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
