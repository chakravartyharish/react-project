import { useEffect } from 'react'
import Cell from './Cell'
import {
  createEmptyBoard,
  placeMines,
  revealCell,
  toggleFlag,
  checkWinCondition,
  countFlags,
  revealAllMines,
} from '../utils/gameLogic'
import './GameBoard.css'

const GameBoard = ({ gameState, updateGameState }) => {
  const { board, gameStatus, mineCount, firstClick, rows, cols } = gameState

  // Initialize empty board on first render
  useEffect(() => {
    if (board.length === 0) {
      const newBoard = createEmptyBoard(rows, cols)
      updateGameState({ board: newBoard })
    }
  }, [board.length, rows, cols, updateGameState])

  const handleCellClick = (row, col) => {
    if (gameStatus !== 'playing') return

    let newBoard = [...board]

    // First click - place mines avoiding the clicked cell
    if (firstClick && board.length > 0) {
      newBoard = placeMines(board, mineCount, row, col)
      updateGameState({ firstClick: false })
    }

    // Reveal the cell
    newBoard = revealCell(newBoard, row, col)

    // Check if clicked on mine
    if (newBoard[row][col].isMine && newBoard[row][col].isRevealed) {
      newBoard = revealAllMines(newBoard)
      updateGameState({
        board: newBoard,
        gameStatus: 'lost',
      })
      return
    }

    // Check win condition
    if (checkWinCondition(newBoard)) {
      updateGameState({
        board: newBoard,
        gameStatus: 'won',
      })
      return
    }

    updateGameState({ board: newBoard })
  }

  const handleCellRightClick = (e, row, col) => {
    e.preventDefault()

    if (gameStatus !== 'playing') return

    const newBoard = toggleFlag(board, row, col)
    const flagCount = countFlags(newBoard)

    updateGameState({
      board: newBoard,
      flagCount,
    })
  }

  if (board.length === 0) {
    return <div className="game-board loading">Loading game...</div>
  }

  return (
    <div className="game-board-container">
      <div
        className={`game-board ${gameStatus}`}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              row={rowIndex}
              col={colIndex}
              onCellClick={handleCellClick}
              onCellRightClick={handleCellRightClick}
              gameStatus={gameStatus}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default GameBoard
