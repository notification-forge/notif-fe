FROM nginx:stable-alpine

USER root

COPY ./dist/notif-fe /var/www/html/
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200
CMD ["nginx" ,"-g", "daemon off;"]