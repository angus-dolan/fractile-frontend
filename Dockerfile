# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/.output/public /usr/share/nginx/html
RUN sed -i 's@location / {@location / {\n try_files $uri $uri/ /index.html;@' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
