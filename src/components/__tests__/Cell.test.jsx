import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Cell from '../Cell'

describe('Cell', () => {
  const mockProps = {
    cell: {
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    },
    onCellClick: vi.fn(),
    onContextMenu: vi.fn(),
    row: 0,
    col: 0,
  }

  it('renders unrevealed cell by default', () => {
    render(<Cell {...mockProps} />)
    const cellElement = screen.getByRole('button')
    expect(cellElement).toBeInTheDocument()
    expect(cellElement).toHaveClass('cell')
  })

  it('displays flag when cell is flagged', () => {
    const flaggedProps = {
      ...mockProps,
      cell: { ...mockProps.cell, isFlagged: true },
    }
    render(<Cell {...flaggedProps} />)
    const cellElement = screen.getByRole('button')
    expect(cellElement).toHaveTextContent('🚩')
  })

  it('shows mine when revealed and is mine', () => {
    const mineProps = {
      ...mockProps,
      cell: { ...mockProps.cell, isMine: true, isRevealed: true },
    }
    render(<Cell {...mineProps} />)
    const cellElement = screen.getByRole('button')
    expect(cellElement).toHaveTextContent('💣')
  })

  it('shows neighbor count when revealed and has neighbors', () => {
    const neighborProps = {
      ...mockProps,
      cell: { ...mockProps.cell, isRevealed: true, neighborMines: 3 },
    }
    render(<Cell {...neighborProps} />)
    const cellElement = screen.getByRole('button')
    expect(cellElement).toHaveTextContent('3')
  })
})
