format: format.ts ## Format all files

format.check: format.check-ts ## Check if every file are formatted

format.ts: ## Format every project files
	pnpm prettier --write .

format.check-ts: ## Check if every ts file are formatted
	pnpm prettier --check src tests && pnpm eslint src tests
