import './GameControls.css'

const GameControls = ({ gameState, onReset }) => {
  const { gameStatus, mineCount, flagCount } = gameState

  const getStatusEmoji = () => {
    switch (gameStatus) {
      case 'won':
        return '🎉'
      case 'lost':
        return '💀'
      default:
        return '🙂'
    }
  }

  const getStatusText = () => {
    switch (gameStatus) {
      case 'won':
        return 'You Won!'
      case 'lost':
        return 'Game Over'
      default:
        return 'Playing'
    }
  }

  const remainingMines = mineCount - flagCount

  return (
    <div className="game-controls">
      <div className="mines-counter">
        <span className="counter-label">Mines:</span>
        <span className="counter-value">{remainingMines}</span>
      </div>

      <div className="game-status">
        <div className="status-display">
          <span className="status-emoji">{getStatusEmoji()}</span>
          <span className="status-text">{getStatusText()}</span>
        </div>
        <button className="reset-button" onClick={onReset} title="New Game">
          🔄 New Game
        </button>
      </div>

      <div className="flags-counter">
        <span className="counter-label">Flags:</span>
        <span className="counter-value">{flagCount}</span>
      </div>
    </div>
  )
}

export default GameControls
