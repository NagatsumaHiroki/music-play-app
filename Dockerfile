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

# 3. Vite のビルド結果を Nginx にコピー
COPY --from=build /app/dist .  

# 4. ✅ Nginx 設定を適用（Cloud Run の `PORT=8080` に対応）
COPY nginx.conf /etc/nginx/conf.d/default.conf  

# 5. ✅ Cloud Run の `PORT=8080` に対応
EXPOSE 8080

# 6. ✅ Nginx をフォアグラウンドで実行
CMD ["nginx", "-g", "daemon off;"]
