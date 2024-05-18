format: format.ts ## Format all files

format.check: format.check-ts ## Check if every file are formatted

format.ts: ## Format every project files
	yarn prettier --write .

format.check-ts: ## Check if every ts file are formatted
	yarn prettier --check src tests && yarn eslint src tests
