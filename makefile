.PHONY: test test-docker test-watch build run dev stop clean help

# Default target
help:
	@echo "Available targets:"
	@echo "  test         - Run tests locally (requires node_modules)"
	@echo "  test-docker  - Run tests in Docker container"
	@echo "  test-watch   - Run tests in watch mode in Docker"
	@echo "  build        - Build production Docker image"
	@echo "  run          - Run production container"
	@echo "  dev          - Run development container"
	@echo "  stop         - Stop all containers"
	@echo "  clean        - Remove all containers, volumes, and images"

# Run tests locally
test:
	npm run test

# Run tests in Docker (one-off)
test-docker:
	@echo "Building test container..."
	@docker compose -f docker-compose.yml -f docker-compose.test.yml build my-app-test || \
		(echo "\nError: Docker permission denied. Try: sudo usermod -aG docker $USER" && exit 1)
	@echo "Running tests..."
	@docker compose -f docker-compose.yml -f docker-compose.test.yml run --rm my-app-test

# Run tests in watch mode in Docker
test-watch:
	docker compose -f docker-compose.yml -f docker-compose.test.yml build my-app-test
	docker compose -f docker-compose.yml -f docker-compose.test.yml run --rm my-app-test npm run test -- --watch

# Build production image
build:
	docker compose build

# Run production container
run:
	docker compose up -d

# Run development container
dev:
	docker compose -f docker-compose.yml -f docker-compose.override.yml up --build

# Stop all containers
stop:
	docker compose down
	docker compose -f docker-compose.yml -f docker-compose.test.yml down

# Clean everything
clean:
	docker compose down --volumes --rmi all
	docker compose -f docker-compose.yml -f docker-compose.test.yml down --volumes --rmi all
	@echo "All containers, volumes, and images removed"