import { useState, useCallback } from 'react'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import './App.css'

function App() {
  const [gameState, setGameState] = useState({
    board: [],
    gameStatus: 'playing', // 'playing', 'won', 'lost'
    mineCount: 10,
    flagCount: 0,
    firstClick: true,
    rows: 9,
    cols: 9
  })

  const resetGame = useCallback(() => {
    setGameState({
      board: [],
      gameStatus: 'playing',
      mineCount: 10,
      flagCount: 0,
      firstClick: true,
      rows: 9,
      cols: 9
    })
  }, [])

  const updateGameState = useCallback((updates) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎮 Minesweeper</h1>
        <GameControls 
          gameState={gameState} 
          onReset={resetGame}
        />
      </header>
      <main>
        <GameBoard 
          gameState={gameState}
          updateGameState={updateGameState}
        />
      </main>
    </div>
  )
}

export default App
