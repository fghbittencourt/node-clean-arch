docker.start.recreate: ## Recreate and get containers up
	docker compose --profile dev up --detach --force-recreate

docker.rebuild: ## Rebuild and get containers up for development
	docker compose --profile dev up --build

docker.run: ## Get containers up for development
	docker compose --profile dev up --detach

docker.tests: ##format.check   Run all testes
	docker compose --profile tests up --build --timeout 10 --abort-on-container-exit tests

docker.stop: ## Get all containers down
	docker compose down

docker.remove: ## Stop and remove containers
	docker compose stop && docker compose rm -vf

docker.spy: ## Show API container logs
	docker compose logs -f api
