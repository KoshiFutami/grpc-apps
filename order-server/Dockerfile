FROM node:22-bookworm-slim AS builder

WORKDIR /app

COPY order-server/package.json ./
RUN npm install

COPY order-server/tsconfig.json ./
COPY order-server/src ./src
COPY proto ./proto

RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production

COPY order-server/package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY proto ./proto

EXPOSE 3000

CMD ["node", "dist/main.js"]
