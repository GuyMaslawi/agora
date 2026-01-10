FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
COPY server/package.json ./server/

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY server ./server

WORKDIR /app/server

RUN pnpm build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]

