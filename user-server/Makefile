MODULE := github.com/koshifutami/grpc-apps/user-server
PROTO := ../proto/user/v1/user.proto

.PHONY: generate tidy run
generate:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	protoc -I ../proto \
		--go_out=. \
		--go_opt=module=$(MODULE) \
		--go-grpc_out=. \
		--go-grpc_opt=module=$(MODULE) \
		$(PROTO)
	go mod tidy

tidy:
	go mod tidy

run:
	go run ./cmd/user-server
