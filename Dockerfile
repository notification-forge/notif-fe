FROM nginx:stable-alpine

USER root

COPY ./dist/notif-fe /var/www/html/
COPY ./nginx.conf /etc/nginx/con.f/default.conf

EXPOSE 8080
CMD ["nginx" ,"-g", "daemon off;"]