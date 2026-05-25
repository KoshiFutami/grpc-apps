.PHONY: up down logs orders user-generate user-build

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

orders:
	curl http://localhost:3000/orders/order-1

user-generate:
	docker run --rm \
		-v $(CURDIR):/workspace \
		-w /workspace/user-server \
		golang:1.26.3-bookworm \
		bash -lc 'export PATH=/usr/local/go/bin:/go/bin:/root/go/bin:$$PATH && apt-get update && apt-get install -y --no-install-recommends protobuf-compiler && make generate'

user-build:
	docker run --rm \
		-v $(CURDIR):/workspace \
		-w /workspace/user-server \
		golang:1.26.3-bookworm \
		bash -lc 'export PATH=/usr/local/go/bin:$$PATH && go build -buildvcs=false ./...'
