# syntax=docker/dockerfile:1

# ---------- 构建阶段 ----------
FROM node:22-alpine AS builder

ARG PUBLIC_SITE_URL=https://pawly.example.com
ARG PUBLIC_BASE_PATH=/
ENV CI=true
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_BASE_PATH=$PUBLIC_BASE_PATH
WORKDIR /app

RUN corepack enable \
    && corepack prepare pnpm@11.28.5 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------- 运行阶段 ----------
FROM nginx:stable-alpine AS runner

COPY deploy/nginx/docker.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
