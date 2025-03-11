FROM nginx:latest

COPY ./docker/ /etc/nginx/

COPY ./public /var/www/episko

COPY ./certs /etc/ssl/nginx/episko

EXPOSE 80
