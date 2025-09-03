# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Собираем проект
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine
# Копируем билд в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Порт, который будет слушать Nginx
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]