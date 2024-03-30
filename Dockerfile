FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.23.1-alpine

EXPOSE 3000

COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
