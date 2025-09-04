// Minesweeper game logic utilities

export const createEmptyBoard = (rows, cols) => {
  return Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        }))
    )
}

export const placeMines = (board, mineCount, excludeRow, excludeCol) => {
  const rows = board.length
  const cols = board[0].length
  const newBoard = board.map(row => row.map(cell => ({ ...cell })))
  let minesPlaced = 0

  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)

    // Don't place mine on first click location or if already has mine
    if (
      (row === excludeRow && col === excludeCol) ||
      newBoard[row][col].isMine
    ) {
      continue
    }

    newBoard[row][col].isMine = true
    minesPlaced++
  }

  return calculateNeighborMines(newBoard)
}

export const calculateNeighborMines = board => {
  const rows = board.length
  const cols = board[0].length
  const newBoard = board.map(row => row.map(cell => ({ ...cell })))

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newBoard[row][col].isMine) {
        let count = 0

        // Check all 8 neighbors
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue

            const newRow = row + dr
            const newCol = col + dc

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (newBoard[newRow][newCol].isMine) {
                count++
              }
            }
          }
        }

        newBoard[row][col].neighborMines = count
      }
    }
  }

  return newBoard
}

export const revealCell = (board, row, col) => {
  const rows = board.length
  const cols = board[0].length
  const newBoard = board.map(row => row.map(cell => ({ ...cell })))

  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return newBoard
  }

  const cell = newBoard[row][col]

  if (cell.isRevealed || cell.isFlagged) {
    return newBoard
  }

  cell.isRevealed = true

  // If cell has no neighboring mines, reveal all neighbors (flood fill)
  if (!cell.isMine && cell.neighborMines === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue

        const newRow = row + dr
        const newCol = col + dc

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const neighbor = newBoard[newRow][newCol]
          if (!neighbor.isRevealed && !neighbor.isFlagged) {
            const updatedBoard = revealCell(newBoard, newRow, newCol)
            // Copy the revealed cells back
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                newBoard[r][c] = updatedBoard[r][c]
              }
            }
          }
        }
      }
    }
  }

  return newBoard
}

export const toggleFlag = (board, row, col) => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })))
  const cell = newBoard[row][col]

  if (!cell.isRevealed) {
    cell.isFlagged = !cell.isFlagged
  }

  return newBoard
}

export const checkWinCondition = board => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const cell = board[row][col]

      // If there's an unrevealed cell that's not a mine, game is not won
      if (!cell.isMine && !cell.isRevealed) {
        return false
      }
    }
  }
  return true
}

export const countFlags = board => {
  let count = 0
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].isFlagged) {
        count++
      }
    }
  }
  return count
}

export const revealAllMines = board => {
  return board.map(row =>
    row.map(cell => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed,
    }))
  )
}
