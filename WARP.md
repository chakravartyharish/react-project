# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Setup
```bash
npm install
```

### Development
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint for code quality checks
```

Note: No testing framework is currently configured in this project.

## Architecture Overview

This is a React-based Minesweeper game built with Vite. The architecture follows a component-based pattern with centralized state management.

### Component Hierarchy
- **App.jsx** - Root component managing global game state and orchestrating child components
- **GameBoard.jsx** - Renders the grid and handles game interactions (click/right-click events)
- **GameControls.jsx** - Displays game status, mine counter, flag counter, and reset button
- **Cell.jsx** - Individual cell component with visual states and click handlers

### Key Directories
- `src/components/` - React components with co-located CSS files
- `src/utils/` - Pure game logic functions (gameLogic.js)

## State Management

State is managed centrally in App.jsx using React's `useState` hook. The main game state object contains:

```javascript
{
  board: [],              // 2D array of cell objects
  gameStatus: 'playing',  // 'playing', 'won', 'lost'
  mineCount: 10,         // Total mines on board
  flagCount: 0,          // Current flags placed
  firstClick: true,      // Special handling for first click
  rows: 9,               // Board dimensions
  cols: 9
}
```

### State Flow
1. **App** holds master state and provides update functions to children
2. **GameBoard** handles game logic and user interactions, updating state via callbacks
3. **GameControls** displays state information and provides reset functionality
4. **Cell** components are purely presentational, receiving state and callbacks as props

## Core Game Logic (`src/utils/gameLogic.js`)

### Key Functions
- `createEmptyBoard(rows, cols)` - Initialize empty cell grid
- `placeMines(board, mineCount, excludeRow, excludeCol)` - Randomly place mines, avoiding first click
- `revealCell(board, row, col)` - Reveal cell and cascade reveal empty neighbors (flood fill algorithm)
- `calculateNeighborMines(board)` - Count adjacent mines for each cell
- `checkWinCondition(board)` - Determine if all non-mine cells are revealed
- `toggleFlag(board, row, col)` - Handle right-click flagging

### Cell State Structure
```javascript
{
  isMine: false,
  isRevealed: false,
  isFlagged: false,
  neighborMines: 0
}
```

## Technical Details

### Build System
- **Vite** with React plugin for fast development and optimized builds
- ES modules with modern JavaScript features
- Hot module replacement in development

### React Patterns Used
- Functional components with hooks (`useState`, `useEffect`, `useCallback`)
- Event delegation for grid interactions
- Conditional rendering based on game state
- CSS-in-JS through className functions

### Game Board Rendering
- Uses CSS Grid for responsive cell layout
- Dynamic grid template based on board dimensions
- Cell styling driven by state classes (revealed, flagged, mine, etc.)

### Event Handling
- Left click: `onCellClick` for revealing cells
- Right click: `onContextMenu` for flagging (preventDefault to avoid browser menu)
- Game state guards prevent interactions when game is over

## Development Tips

### Modifying Board Size/Difficulty
Update the initial state in App.jsx:
```javascript
const [gameState, setGameState] = useState({
  // ... other properties
  mineCount: 10,  // Adjust mine count
  rows: 9,        // Board height
  cols: 9         // Board width
})
```

### Adding New Game Features
- Game logic functions go in `src/utils/gameLogic.js`
- UI components go in `src/components/` with co-located CSS
- Global state changes require updating App.jsx and relevant child components

### CSS Styling
- Each component has its own CSS file (e.g., `Cell.css`, `GameBoard.css`)
- Cell appearance uses CSS classes based on game state
- Number colors and mine/flag emojis defined in CSS

### Performance Considerations
- Board re-renders are minimized using `useCallback` for state updates
- Cell components rely on React's diffing for efficient updates
- Large boards (>20x20) may benefit from virtualization for optimal performance
