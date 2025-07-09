FROM oven/bun:slim AS base

WORKDIR /app

COPY package.json bun.lock .git ./
RUN bun install --production

COPY . .

RUN bun run build

FROM oven/bun:slim AS final

WORKDIR /app

COPY --from=base /app/dist /app/dist

EXPOSE 3000

CMD ["bun", "run", "/app/dist/index.js"]
