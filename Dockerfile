FROM node:alpine as build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm cache clean --force

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

##################################################

FROM nginx:latest AS ngi

COPY --from=build /usr/src/app/dist/image_service_frontend/browser /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80