import { filter, flatten, indexOf, isEmpty, reduce, repeat, update } from 'ramda'

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

const getPlayer = (move) => {
  return (move % 2 === 0) ? 'x' : 'o'
}

const getBoard = (moves) => {
  return reduce(
    (board, square) => update(square, getPlayer(indexOf(square, moves)), board),
    repeat('', 9),
    moves
  )
}

const getWins = (board) => {
  return filter((pattern) => {
    let s1 = board[pattern[0]]
    let s2 = board[pattern[1]]
    let s3 = board[pattern[2]]

    return s1 && s1 === s2 && s2 === s3
  }, WIN_PATTERNS)
}

export default (moves) => {
  const board = getBoard(moves)
  const wins = flatten(getWins(board))
  const inPlay = isEmpty(wins)

  return { board, wins, inPlay }
}
