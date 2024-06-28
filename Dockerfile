FROM node:18-alpine AS builder
ARG VITE_APP_API_URL
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_REDIRECT_URI
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_AUDIENCE
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_APP_API_URL=$VITE_APP_API_URL \
    VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID \
    VITE_AUTH0_REDIRECT_URI=$VITE_AUTH0_REDIRECT_URI \
    VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN \
    VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE \
    VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 3000
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
