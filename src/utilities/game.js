import { filter, indexOf, reduce, repeat, update } from 'ramda'

// Note how the first three patterns, taken together, represent the board
// and the second three represent the board rotated 90 degrees and flipped over,
// while the last two are the diagonals.
const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Given a move (first, second, third, etc.) return the player, x or o
// Player x always moves first, which is index 0
const getPlayer = (move) => {
  return (move % 2 === 0) ? 'x' : 'o'
}

// Given a list of moves (e.g., [4, 3, 0, 8])
// return a board (e.g., ['x', '', '', 'o', 'x', '', '', '', 'o'])
const getBoard = (moves) => {
  // For each move, determine the player and update the square
  // The index of the move in the moves array is the number of the move
  // e.g., the first move is index 0, the second is index 1, etc.
  return reduce(
    (board, square) => update(square, getPlayer(indexOf(square, moves)), board),
    repeat('', 9), // start with nine empty strings
    moves          // iterate through the moves
  )
}

// Check for wins by comparing rows, columns, and diagonals
// to the WIN_PATTERNS above
const getWins = (board) => {
  // Return an array of any matching win patterns (an array of arrays)
  return filter((pattern) => {
    let s1 = board[pattern[0]]
    let s2 = board[pattern[1]]
    let s3 = board[pattern[2]]

    return s1 && s1 === s2 && s2 === s3
  }, WIN_PATTERNS)
}

// For example, if we had this board:
//    ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x']
// the getWins(board) call would return:
//    [ [0, 4, 8], [2, 4, 6] ]
// because x wins on both diagonals.

// You can see this win by starting on a corner, going sequentially around
// the outside of the square, and clicking on the center square last.

export { getBoard, getWins }
