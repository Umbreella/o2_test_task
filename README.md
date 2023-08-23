# O2 RUS (Fullstack app)

---

## [Backend](django_app)

![python](https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![django](https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white)
![drf](https://img.shields.io/badge/django_rest_framework-A30000?style=for-the-badge&logo=django&logoColor=white)

## [Frontend](react_app)

![html5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![bootstrap](https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![jss](https://img.shields.io/badge/jss-F7DF1E?style=for-the-badge&logo=jss&logoColor=white)
![react](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white)

## Database

![postgresql](https://img.shields.io/badge/postgresql_(postgis)-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

## Cloud

![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## Description

[Task Description](TaskDescription.pdf)

## Getting Started

### Environment variables

* To run the application, you have to perform one of the options:
    * specify the **environment variables**
    * overwrite **.env** file
* The list of all environment variables is specified
    * **[.env.django](django_app/.env)**
    * **.env.postgres**
        * POSTGRES_PASSWORD

## Docker (localhost)

1. [docker-compose.yaml](docker-demo/docker-compose.yaml)

```yaml
version: "3"

services:
  o2_test_task:
    image: umbreella/o2_test_task:latest
    container_name: o2_test_task
    ports:
      - [ your_open_port ]:80
      # To access to PostgreSQL
      - [ your_open_port ]:5432
    privileged: true
    env_file:
      - [ path_to_env ]
    volumes:
      # To save StaticFiles
      - [ volume / path_to_folder ]:/usr/src/app/static
      # To save Database
      - [ volume / path_to_folder ]:/var/lib/postgresql/data
```

2. Docker-compose run

```commandline
docker-compose up -d
```

3. Open bash in container

```commandline
docker exec --it o2_test_task bash
```

4. Restore Database from Backup

```commandline
pg_restore -h localhost -p 5432 -U postgres -d postgres -v backup.sql
```

5. Collect static files

```commandline
python3 /usr/src/app/manage.py collectstatic
```

* Create superuser (optional)

```commandline
python3 /usr/src/app/manage.py createsuperuser
```

## Endpoints

* Main

```jsonpath
[your_ip_address]/
```

* Django Admin

```jsonpath
[your_ip_address]/api/admin/
```

* REST-API Docs

```jsonpath
[your_ip_address]/api/docs/
```

### Login Data

* login: admin@admin.admin
* password: admin