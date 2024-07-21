docker.dev.rebuild: ## Rebuild and get containers up for development (db, messaging)
	docker compose --profile dev up --build

docker.dev.run: ## Get containers up for development (db, messaging)
	docker compose --profile dev up --detach

docker.db.run: ## Get database container up
	docker-compose --profile db up --detach

docker.api.run: ## Get api and database containers up
	docker-compose --profile api up --build --detach

docker.api.spy: ## Show API container logs
	docker compose logs --follow api

docker.tests.run: ## Run all tests
	docker compose --profile tests up --build --timeout 10 --abort-on-container-exit tests

docker.stop: ## Get all containers down
	docker compose --profile "*" down

docker.remove: ## Stop and remove containers
	docker compose --profile "*" stop && docker compose rm --volumes --force


