FROM golang:1.26.3-bookworm AS builder

WORKDIR /app

COPY user-server/go.mod user-server/go.sum ./
RUN go mod download

COPY user-server ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/user-server ./cmd/user-server

FROM scratch

COPY --from=builder /bin/user-server /user-server

EXPOSE 50051

ENTRYPOINT ["/user-server"]
