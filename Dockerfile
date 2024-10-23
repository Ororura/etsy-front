FROM node:18-alpine AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build

# Копируем сборку приложения в директорию, откуда nginx будет сервировать файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Экспонируем порт 80 для доступа к приложению
EXPOSE 80