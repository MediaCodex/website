# binary aliases
SHELL:=/bin/bash -O globstar
NUXT=./node_modules/.bin/nuxt

##@ Dependencies
.PHONY: install install-tools install-js

install: install-tools install-js ## Install all dependencies

install-tools: ## Install tooling
	asdf install

install-js: ## Install JS dependencies
	rm -r node_modules/
	npm i

##@ Lint
.PHONY: lint

lint: ## Run all linters

##@ Build
.PHONY: build

build: ## Build everything

##@ Helpers
.PHONY: help start

start: ## Start a local development server
	@echo "Starting local dev server"
	$(NUXT) dev --host 0.0.0.0

help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)