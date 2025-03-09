# ベースイメージ
FROM node:22-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginxで配信
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# パッケージファイルをコピー
COPY package.json package-lock.json ./

EXPOSE 80

# 作業ディレクトリを設定
WORKDIR /app

# 開発用サーバの起動
CMD ["nginx", "-g", "daemon off;","npm", "run", "dev"]