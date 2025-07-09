FROM oven/bun:alpine AS base

RUN apk add --no-cache git

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production

COPY . .

RUN bun run build

FROM oven/bun:slim AS final

WORKDIR /app

COPY --from=base /app/dist /app/dist

EXPOSE 3000

CMD ["bun", "run", "/app/dist/index.js"]
