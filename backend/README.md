## Para poder probar las apis debes descargar postman desktop agent
- enlace : https://www.postman.com/downloads/postman-agent/

## comando para correr la bd
- cd backend
- ./mvnw clean : para borrar cache
- ./mvnw spring-boot:run : para correr la app 

## comando para correr el frontend
- ng serve

# APIs del Proyecto

## Rol
- GET : http://localhost:8080/rol
- POST : http://localhost:8080/rol
- PUT : http://localhost:8080/rol/{id}
- DELETE : http://localhost:8080/rol/{id}


## Usuario
- GET : http://localhost:8080/usuario
- POST : http://localhost:8080/usuario
- PUT : http://localhost:8080/usuario/{id}
- DELETE : http://localhost:8080/usuario/{id}

## Entrenador 
- GET : http://localhost:8080/entrenador
- POST : http://localhost:8080/entrenador
- put : http://localhost:8080/entrenador/{id}
- DELETE : http://localhost:8080/entrenador/{id}

## Socio
- GET : http://localhost:8080/socio
- POST : http://localhost:8080/socio
- DELETE : http://localhost:8080/socio/{id}

## Aministrador

- GET : http://localhost:8080/administrador
- POST : http://localhost:8080/administrador
- DELETE : http://localhost:8080/administrador/{id}

## Membresia 

## MEMBRESIAS POR USUARIO
- GET: http://localhost:8080/usuario/{ID_USUARIO}/socio/{ID_SOCIO}/membresia
- POST: http://localhost:8080/usuario/{ID_USUARIO}/socio/{ID_SOCIO}/membresia
-DELETE: http://localhost:8080/usuario/{ID_USUARIO}/socio/{ID_SOCIO}/membresia/{ID_MEMBRESIA}

## todas las membresias
- GET: http://localhost:8080/membresia

## RUTINA
- get: http://localhost:8080/rutina
- post: http://localhost:8080/rutina
- delete: http://localhost:8080/rutina/{id}

## Ejercicio 
- get: http://localhost:8080/ejercicio
- post: http://localhost:8080/ejercicio
- delete: http://localhost:8080/ejercicio/{id}

## pago
- GET : http://localhost:8080/pago
- POST : http://localhost:8080/pago
- DELETE : http://localhost:8080/pago/{id}

# clase
- GET : http://localhost:8080/clase
- POST : http://localhost:8080/clase
- DELETE : http://localhost:8080/clase/{id}
