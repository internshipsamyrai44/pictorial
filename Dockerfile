#Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN pnpm install

#Билдим приложение
#Кэширование зависимостей — если файлы в проекте изменились,
#но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:20.11-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

#Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["pnpm", "start"]
