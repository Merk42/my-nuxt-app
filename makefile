.PHONY: test build run dev stop clean

test:
	npm run test

build:
	docker compose build

run:
	docker compose up -d

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

stop:
	docker compose down

clean:
	docker compose down --volumes --rmi all