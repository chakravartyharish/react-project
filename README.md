# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## MCP Server Integration

This project can work with Model Context Protocol (MCP) servers for enhanced AI-assisted development (e.g., when using Claude Desktop).

### Available MCP Servers

1. Filesystem Server — access to the project workspace
   - Root: `/home/harish/Development/minesweeper-react`
2. Git Server — repository operations and history
   - Repository: the current project directory
3. SQLite Server — local development database
   - DB: `./dev.db` (created on first use)
4. GitHub Server — GitHub API integration
   - Requires env: `GITHUB_TOKEN`
5. Brave Search Server — web search
   - Requires env: `BRAVE_API_KEY`

### Setup Instructions

1. Copy env template and add your keys
   ```bash
   cp .env.example .env
   # edit .env to fill values
   ```
2. Export variables (for shell sessions / Claude Desktop)
   ```bash
   # Add to ~/.bashrc or ~/.profile
   export GITHUB_TOKEN="your_github_token"
   export BRAVE_API_KEY="your_brave_api_key"
   ```
3. Optional: manual test of servers
   ```bash
   npm run mcp:filesystem -- --help
   npm run mcp:git -- --help
   ```
4. Restart Claude Desktop to pick up configuration

### Notes

- Do not commit your `.env` or `dev.db` (already in .gitignore)
- Free Brave API tier available: https://api.search.brave.com/app/keys
- GitHub token scopes: repo, read:org, read:user
