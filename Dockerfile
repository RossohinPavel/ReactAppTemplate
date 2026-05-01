# Активируем pnpm
FROM node:24.14.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Устанавливаем зависимости
FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Сборка приложения
FROM dependencies AS build

ARG VITE_PUBLIC_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL

COPY frontend ./frontend
COPY shared ./shared

RUN pnpm --filter frontend build

# Финальный образ
FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html/
COPY ./frontend/nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]