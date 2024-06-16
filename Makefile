.DEFAULT_GOAL := help
SHELL := /bin/bash

include makefiles/docker.mk
include makefiles/format.mk
include makefiles/help.mk

.PHONY: create.env-file ## Create a .env file based on sample
create.env-file:
	cp .env.sample .env

.PHONY: setup ## Setup environment
setup: create.env-file install

.PHONY: test ## Run tests on docker
test: format.check create.env-file docker.tests ## Run tests locally

.PHONY: install ## Install packages
install:
	pnpm install

.PHONY: dev
dev: setup docker.run ## Install an run the server locally
	pnpm dev
