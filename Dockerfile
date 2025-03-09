# 1. Vite のビルド
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Nginx で配信
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 3. Vite のビルド結果を Nginx のルートにコピー
COPY --from=build /app/dist .  

# 4. カスタム Nginx 設定を適用
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]