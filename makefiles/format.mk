format: format.ts ## Format all files

format.check: format.check-ts ## Check if every file are formatted

format.ts: ## Format every project files
	pnpm eslint --fix .

format.check-ts: ## Check if every ts file are formatted
	pnpm eslint src tests
