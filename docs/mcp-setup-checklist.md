# MCP Setup Verification Checklist

## Pre-requisites

- [ ] Claude Desktop installed on Ubuntu Linux
- [ ] Node.js and npm available in PATH
- [ ] Project cloned to `/home/harish/Development/minesweeper-react`

## Configuration Files

- [ ] `~/.config/Claude/claude_desktop_config.json` created/updated
- [ ] `.env.example` copied to `.env`
- [ ] `.env` added to `.gitignore`
- [ ] `dev.db` added to `.gitignore`

## API Keys and Tokens

- [ ] GitHub Personal Access Token created with required scopes
- [ ] Brave Search API Key obtained (free tier OK)
- [ ] Environment variables set in `.env` file
- [ ] Environment variables exported in shell profile (`~/.bashrc` or `~/.profile`)

## Testing

- [ ] Run `source ~/.bashrc` to load environment variables
- [ ] Test filesystem server: `npm run mcp:filesystem -- --help`
- [ ] Test git server: `npm run mcp:git -- --help`
- [ ] Restart Claude Desktop
- [ ] Verify servers appear in Claude Desktop developer tools

## Troubleshooting

### Servers not appearing in Claude Desktop

1. Check config file syntax: `jq . ~/.config/Claude/claude_desktop_config.json`
2. Ensure Claude Desktop was restarted after config changes
3. Check Claude Desktop logs for errors

### Environment variables not working

1. Verify variables are exported: `echo $GITHUB_TOKEN`
2. Ensure Claude Desktop was started from a shell with variables set
3. Try launching Claude Desktop from terminal: `claude-desktop`

### SQLite database issues

1. Create empty database if needed: `touch dev.db`
2. Ensure write permissions: `chmod 664 dev.db`
