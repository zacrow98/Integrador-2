# Trabajo practico integrador N°2 

- 1 [API](#api-de-prendas)
  
  - 1.1 [Requisitos Previos](#requisitos-previos)

- 2 [CRUD](#crud)

  - 2.1 [Create](#create)

  - 2.2 [Read](#read)

  - 2.3 [Update](#update)

  - 2.4 [Delete](#delete)

- 3 [ENDPOINT](#endpoint-con-sus-metodos)
### API de prendas.

Esta documentación describe las peticiones de creación (create), lectura (read), actualización (update) y eliminación (delete) disponibles en la API de prendas. Estas peticiones permiten interactuar con elementos existentes en la API, como registros o recursos.

### Requisitos previos

Antes de realizar peticiones de creación, asegúrate de tener la siguiente información y configuración:

- Acceso a la URL base de la API: `http://localhost:3008`
- Credenciales de autenticación, si es necesario.
- Conocimiento de los campos y formatos requeridos para crear un elemento en la API.

# CRUD

## Create

### Peticiones disponibles

A continuación se presentan las peticiones de creación disponibles en la API de prendas:

### Crear un nuevo registro

- **Descripción:** Crea un nuevo registro en la base de datos.
- **URL:** `https://localhost:3008/prendas`
- **Método:** POST
- **Cuerpo de la petición:** Debes proporcionar los datos necesarios en el cuerpo de la petición en formato JSON. Asegúrate de incluir todos los campos requeridos para crear un registro.

Ejemplo de cuerpo de la petición:
```json
{
  "codigo": 1,
  "nombre": "Jeans Denim",
  "precio": 59.99,
  "categoria": "Jeans"
}
```

- **Respuesta exitosa:** La petición devuelve un código de estado 201 (Created) y la respuesta contiene los detalles del nuevo registro creado.

- **Respuesta de error:** Si la petición falla, se devolverá un código de estado  (por ejemplo, 400 para errores de validación) y la respuesta contendrá información sobre el error.

### Notas adicionales

- Asegúrate de cumplir con los requisitos de autenticación, si es necesario, para realizar peticiones de creación.
- Verifica los campos requeridos y los formatos esperados en la documentación de la API para cada tipo de elemento que desees crear.
- Utiliza las respuestas de error para identificar y solucionar problemas en caso de que la petición de creación falle.

## Read

## Peticiones disponibles

A continuación se presentan las peticiones de lectura, en la API de prendas:

### Leer un registro

- **Descripción:** Obtiene los detalles de un registro específico.
- **URL:** `http://localhost:3008/prendas/{codigo}`
- **Método:** GET
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del registro que deseas obtener.

- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles del registro solicitado.

- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.

## Update

### Actualizar un recurso

- **Descripción:** Actualiza los detalles de un recurso existente en la API.
- **URL:** `http://localhost:3008/prendas/{codigo}`
- **Método:** PUT
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del objeto que deseas actualizar.

- **Cuerpo de la petición:** Debes proporcionar los nuevos datos del objeto en el cuerpo de la petición en formato JSON. Asegúrate de incluir todos los campos requeridos para la actualización.

Ejemplo de cuerpo de la petición:
```json
{
  "codigo": 1,
  "nombre": "Jeans Denim",
  "precio": 59.99,
  "categoria": "Jeans"
}
```

- **Respuesta exitosa:** La petición devuelve un código de estado 200 (OK) y la respuesta contiene los detalles actualizados del objeto.

- **Respuesta de error:** Si la petición falla, se devolverá un código de estado apropiado (por ejemplo, 400 para errores de validación) y la respuesta contendrá información adicional sobre el error.

## Delete

### Eliminar un registro

- **Descripción:** Elimina un registro existente de la base de datos.
- **URL:** `http://localhost:3008/prendas/delete/{codigo}`
- **Método:** DELETE
- **Parámetros de la petición:** Reemplaza `{codigo}` en la URL con el identificador del registro que deseas eliminar.

- **Respuesta exitosa:** La petición devuelve un código de estado 204 (No Content) si la eliminación fue exitosa.

- **Respuesta de error:** Si la petición falla o el registro no existe, se devolverá un código de estado apropiado (por ejemplo, 404 si el registro no se encuentra) y la respuesta contendrá información adicional sobre el error.


### endpoint con sus metodos

|peticion |url |descriptcion |
|----|-----------------------------|--------------------------|
|GET| http://localhost:3008/prenda|muestra todos los art prenda|
|GET| http://localhost:3008/prenda/codigo/{codigo}|obtiene un art por su codigo|
|GET| http://localhost:3008/prenda/nombre/{nombre}|obtiene  uno o mas articulos por parte de su nombre|
|GET| http://localhost:3008/prenda/precio/{precio}|obtiene  uno o mas articulos por su precio o parte del mismo|
|GET| http://localhost:3008/prenda/categoria/{categoria}|obtiene articulos por parte de su nombre de su categoria|
|POST| http://localhost:3008/prenda/{codigo}|agregar un art prenda con los propiedades en el body|
|PATCH| http://localhost:3008/prenda/codigo/{codigo}|actualizar precio de un art prenda con las propiedades de precio en el body|
|DELETE| http://localhost:3008/prenda/delete/{codigo}|elimina el art prenda por el identificador de codigo|