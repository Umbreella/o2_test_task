FROM node:19-alpine AS react-build

WORKDIR /app
COPY react_app .
RUN npm install && npm run build


FROM postgis/postgis:14-3.3

RUN apt-get update -y
RUN apt-get install -y supervisor
RUN apt-get install -y nginx
RUN apt-get install -y binutils libproj-dev gdal-bin python3-pip

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=react-build /app/build .
COPY configs/react.conf /etc/nginx/nginx.conf


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/app
COPY django_app/requirements.txt /usr/src/app/requirements.txt
RUN pip3 install --upgrade pip && pip3 install -r requirements.txt
COPY django_app/ /usr/src/app/


WORKDIR /etc
COPY configs/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY configs/backup.sql backup.sql

CMD ["/usr/bin/supervisord"]
