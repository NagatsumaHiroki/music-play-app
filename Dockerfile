# ベースイメージ
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginxで配信
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

# パッケージファイルをコピー
COPY package.json package-lock.json ./

# 作業ディレクトリを設定
WORKDIR /app

# Cloud Run は PORT 環境変数を自動設定するため明示的に 8080 を指定
ENV PORT=8080
EXPOSE 8080

# 開発用サーバの起動
CMD ["nginx", "-g", "node", "server.js", "daemon off;","npm", "run", "dev"]