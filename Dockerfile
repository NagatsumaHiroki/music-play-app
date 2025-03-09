# 1. Node.js イメージを使用
FROM node:18 AS build
WORKDIR /app

# 2. 必要なファイルをコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# 3. Vite のビルド
RUN npm run build

# 4. Nginx で配信
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 5. ビルドしたファイルを Nginx の公開ディレクトリへコピー
COPY --from=build /app/dist . 

# 6. Cloud Run のポートを設定（デフォルトは 5173 から 8080 へ）
ENV PORT=8080
EXPOSE 8080

# 7. Nginx を起動
CMD ["nginx", "-g", "daemon off;"]