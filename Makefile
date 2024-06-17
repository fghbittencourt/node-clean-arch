.DEFAULT_GOAL := help
SHELL := /bin/bash

include makefiles/docker.mk
include makefiles/format.mk
include makefiles/help.mk

create.env-file: ## Creates a local .env file based on sample
	cp .env.sample .env

setup: create.env-file install ## Setup environment

test: format.check create.env-file docker.tests ## Run tests locally

install: ## Install packages
	pnpm install

dev: setup docker.run ## Install and run the server locally
	pnpm dev
