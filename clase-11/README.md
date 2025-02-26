# Clase 11.

## Links

- https://docs.expo.dev/versions/latest/sdk/router-ui/

## Conceptos.

### Router and params

Siempre definir rutas simples, con 1 parametro.

/users/:id/profile
/products/:id/details
/products/:id/edit

- Persistencia de datos en el proceso de creación de una entidad.
- Crear el UUID de la entidad y guardarlo en la base de datos.
- Redireccion a la edición de la entidad.

Abrir app => chequear si hay registro pendiente.

/register/:id/step1 => Object con la data del step1 al step2
/register/:id/step2 => Object con la data del step2 al step3
/register/:id/step3 => Object con la data del step3 al server
