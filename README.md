# TyBA

## Requerimientos
Es necesario instalar [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) .

## Instalación
Clonamos o copiamos el proyecto y entramos en el desde una terminal.
```bash
npm i
```

## Configuración
debemos crear o editar el archivo .env en la raíz del proyecto. A continuación dejo una copia de como lo tengo pero se entiende que esto no se almacena en el repositorio ya que contiene llaves de twitter.

```
NODE_ENV=development
PORT=3000
SECRET=HwKtC3QFwFnjX2JS

REDIS_URL=redis://127.0.0.1:6379

DATABASE_DRIVER=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=tyba
DATABASE_PASSWORD=tyba
DATABASE_NAME=tyba
DATABASE_SYNC=true

BASE_URL=http://localhost:5000

GOOGLE_MAPS_KEY=AIzaSyApA42pEhWXBxDY4t0edrf8AolgfL0PDtI
```
## Ejecución
Solo debemos lanzar el siguiente comando sobre la raíz del proyecto.
```bash
docker-compose up -d --build
```
## API Rest

**Login**

```http
POST {{host}}/auth/sign-up
Content-Type: application/json

{
    "name": "...",
    "last_name": "...",
    "phone": "+57...",
    "email": "...",
    "password": "..."
}
```
Respuesta esperada.
```http
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 241
ETag: W/"f1-WnOb9eJk51hC06Oxi7SZESIONng"
Date: Wed, 20 Jul 2022 21:51:23 GMT
Connection: close

{
  "session": {
    "id": 1,
    "name": "...",
    "last_name": "...",
    "email": "...",
    "photo_url": ""
  },
  "token": "..."
}
```
**Login**
```http
###
POST {{host}}/auth/sign-in
Content-Type: application/json

{
    "email": "...",
    "password": "..."
}
```
Respuesta esperada.
```http
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 241
ETag: W/"f1-WnOb9eJk51hC06Oxi7SZESIONng"
Date: Wed, 20 Jul 2022 21:51:23 GMT
Connection: close

{
  "session": {
    "id": 1,
    "name": "...",
    "last_name": "...",
    "email": "...",
    "photo_url": ""
  },
  "token": "..."
}
```
**Consultar session**
```http
###
GET {{host}}/auth/session
Authorization: {{authorization}}
```
Respuesta esperada.
```http
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 241
ETag: W/"f1-WnOb9eJk51hC06Oxi7SZESIONng"
Date: Wed, 20 Jul 2022 21:51:23 GMT
Connection: close

{
  "session": {
    "id": 1,
    "name": "...",
    "last_name": "...",
    "email": "...",
    "photo_url": ""
  },
  "token": "..."
}
```
**Cerrar session**
```http
###
DELETE {{host}}/auth/session
Authorization: {{authorization}}
```
Respuesta esperada.
```http
HTTP/1.1 204 No Content
X-Powered-By: Express
Access-Control-Allow-Origin: *
Date: Wed, 20 Jul 2022 21:59:23 GMT
Connection: close
```
**Consultar restaurantes**
```http
###
GET {{host}}/maps/restaurant?location=4.6857203,-74.0756886
Authorization: {{authorization}}
```
Respuesta esperada.
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 23166
ETag: W/"5a7e-Vx6fNScjQE0UttGMtEoMDk5eSHw"
Date: Wed, 20 Jul 2022 22:01:31 GMT
Connection: close

[
  {
    "business_status": "OPERATIONAL",
    "geometry": {
      "location": {
        "lat": 4.686277899999999,
        "lng": -74.0691044
      },
      "viewport": {
        "northeast": {
          "lat": 4.687646080291501,
          "lng": -74.06785046970849
        },
        "southwest": {
          "lat": 4.684948119708498,
          "lng": -74.0705484302915
        }
      }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    "icon_background_color": "#FF9E67",
    "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    "name": "Vasconia Bakery",
    "opening_hours": {
      "open_now": true
    },
    "photos": [
      {
        "height": 2976,
        "html_attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114410574665283923415\">Dayana Buitrago</a>"
        ],
        "photo_reference": "AeJbb3cV_PTUoQDjAAkHVFrMKpd6UDpWsmhz2TP9B3P18H03wbmFcdyuqH56Ec7t6B4zXW664tmehFdkkFO3jPRLsZabfXJJfDpSKKmG3ksdBcjd9pJfFj2W8U7_hgIfkeZphrYbpGG3Li7afmxxy_uBsJU1sPgtcLF0KbbYZqGCc4RkaFh2",
        "width": 3968
      }
    ],
    "place_id": "ChIJyQi_Y-eaP44RpgSOrmIShQs",
    "plus_code": {
      "global_code": "67P7MWPJ+G9"
    },
    "rating": 4.3,
    "reference": "ChIJyQi_Y-eaP44RpgSOrmIShQs",
    "scope": "GOOGLE",
    "types": [
      "restaurant",
      "bakery",
      "store",
      "food",
      "point_of_interest",
      "establishment"
    ],
    "user_ratings_total": 1080,
    "vicinity": "Carrera 63 #96-60"
  }
]
```
**Ver la historia**
```http
###
GET http://localhost:3000/history
Authorization: {{authorization}}
```
Respuesta esperada.
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1819
ETag: W/"71b-DQmP+ywzFbqFZ4kU/zJ1PNymQK0"
Date: Wed, 20 Jul 2022 22:04:27 GMT
Connection: close

[
  {
    "id": 1,
    "method": "GET",
    "url": "/health",
    "email": "",
    "creation_at": "2022-07-20T21:44:16.908Z"
  }
]
```
