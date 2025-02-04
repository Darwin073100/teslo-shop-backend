<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="250" alt="Nest Logo" /></a>
</p>

# TesloShop DB
Se realiza una API REST
## INstalar las dependencias
```
npm install
```
## Levantar la DB
```
docker compose up -d
```
## Compilar y correr la aplicacion
```
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
``` 

## Ejecutar el Seed
```
# Data inicial de productos {get}
http://localhost:3000/api/seed
```

## Stack utilizado
* PostgreSQL
* Docker Compose
* Nest.js
* TypeORM
* Typescript