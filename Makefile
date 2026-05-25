.PHONY: up down logs orders user-generate

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

orders:
	curl http://localhost:3000/orders/order-1

user-generate:
	$(MAKE) -C user-server generate
