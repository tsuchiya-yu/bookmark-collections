FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# glibc 互換（Next.jsで必要になることがある）
RUN apk add --no-cache libc6-compat

# dev サーバをフォアグラウンド起動
CMD ["npm", "run", "dev"]
