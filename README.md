# grpc-apps

Go の gRPC サーバと NestJS の HTTP サーバを Docker Compose で起動し、サーバ間通信を gRPC で試すための学習用リポジトリです。

このリポジトリは、`.proto` と gRPC 関連コードを自分で書いて学ぶためのスケルトンです。

## 構成

```text
grpc-apps/
  proto/user/v1/README.md         # ここに user.proto を作る
  user-server/                    # Go の gRPC サーバ
  order-server/                   # NestJS の HTTP API。あとで gRPC クライアントにする
  docker-compose.yml              # 2サーバを同じ Docker ネットワークで起動
```

通信の流れは次の通りです。

```text
curl localhost:3000/orders/order-1
  -> order-server (NestJS HTTP)
    -> user-server (Go gRPC) をあとで呼ぶ
  <- order + user
```

## 現在の起動

```bash
docker compose up --build
```

別ターミナルから確認します。

```bash
curl http://localhost:3000/orders
curl http://localhost:3000/orders/order-1
```

最初の状態では、`order-server` はまだ `user-server` を呼びません。ここから gRPC 通信を足していきます。

## 実装ステップ

1. `proto/user/v1/user.proto` を作る
2. `user-server` で Go の生成コードを作る
3. `user-server/cmd/user-server/main.go` に gRPC サーバを実装する
4. `order-server/src/app.module.ts` に gRPC client 設定を追加する
5. `order-server/src/orders.controller.ts` から `GetUser` を呼ぶ
6. `curl http://localhost:3000/orders/order-1` で order + user が返ることを確認する

## gRPC を直接呼ぶ

実装後、`grpcurl` が入っていれば Go サーバを直接確認できます。

```bash
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext -d '{"userId":"user-1"}' localhost:50051 user.v1.UserService/GetUser
```

## 学ぶ順番

1. `.proto` で service と message を定義する
2. 生成コードが何を作るか見る
3. Go の service 実装を書く
4. NestJS の gRPC client 設定を書く
5. HTTP リクエストから gRPC 呼び出しへ流れる箇所を書く
6. `docker-compose.yml` でコンテナ間通信の宛先が `user-server:50051` になっていることを確認する

Go の生成コードを手元で見たい場合は、Go 1.26 系を入れた状態で次を実行します。

```bash
make user-generate
```

生成されたコードは `user-server/gen/` に出力されます。
