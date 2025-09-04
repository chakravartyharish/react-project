import './Cell.css'

const Cell = ({
  cell,
  row,
  col,
  onCellClick,
  onCellRightClick,
  gameStatus,
}) => {
  const { isMine, isRevealed, isFlagged, neighborMines } = cell

  const handleClick = () => {
    if (!isRevealed && !isFlagged) {
      onCellClick(row, col)
    }
  }

  const handleRightClick = e => {
    onCellRightClick(e, row, col)
  }

  const getCellContent = () => {
    if (isFlagged) {
      return '🚩'
    }

    if (!isRevealed) {
      return ''
    }

    if (isMine) {
      return '💣'
    }

    return neighborMines > 0 ? neighborMines : ''
  }

  const getCellClass = () => {
    let classes = ['cell']

    if (isRevealed) {
      classes.push('revealed')

      if (isMine) {
        classes.push('mine')
        if (gameStatus === 'lost') {
          classes.push('exploded')
        }
      } else {
        classes.push('safe')
        if (neighborMines > 0) {
          classes.push(`number-${neighborMines}`)
        }
      }
    } else {
      classes.push('hidden')

      if (isFlagged) {
        classes.push('flagged')
      }
    }

    return classes.join(' ')
  }

  return (
    <button
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={gameStatus !== 'playing'}
    >
      {getCellContent()}
    </button>
  )
}

export default Cell
