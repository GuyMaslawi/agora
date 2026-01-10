FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
COPY client/package.json ./client/

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY client ./client

WORKDIR /app/client

RUN pnpm build

FROM nginx:alpine AS production

COPY --from=builder /app/client/dist /usr/share/nginx/html

COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

