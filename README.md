# Test BEGO

## Descripción y funcionalidad

API de gestión básica de ordenes a entregar por un medio de transporte. Trabajando con los modelos **location**, **order**, **truck** y **user**.  
Se implementaron acciones **CRUD**, no solo las básicas, también generales como `deleteAll` y `getAll`.  
Se buscó tener una buena estructura de proyecto y apropiadas prácticas de programación.

---

## Dependencias utilizadas

-   axios
-   bcryptjs
-   colors
-   dotenv
-   express
-   mongoose
-   morgan
-   nodemon
-   express-validator
-   jsonwebtoken

---

## Estructura del proyecto

Las ramas principales para la prueba técnica son el main y todas aquellas que empiecen con **feature**. Ya que le dare seguimiento después de hacer la entrega. Considero agregar una separación de logica de negocio siguientedo conceptos de **Clean Architecture** y **Jest**

## Abordaje del proyecto

1. Comencé estableciendo las bases y estructura del proyecto, y las dependencias que me ayudaron a ser más eficiente en mi trabajo, tales como **nodemon, colors, morgan**.
2. Definí la ruta de dominios por hacer, en el orden de **user, truck, location y order**.
3. Por cada dominio definía los archivos del **model, route y controller**.
4. En los modelos implementé la validación de atributos según las posibles restricciones de estos mismos.
5. Busqué la implementación de middlewares y declaraciones globales en el request para simplificar, reducir y hacer más legible el código.
6. Seguí buenas prácticas de **HTTP status codes** y formatos de respuesta **JSON**.
7. Probé la API con **Postman** para validar las restricciones y registro de modelos en la base de datos.

---

## Consideraciones / Dudas

1. Normalmente el borrar elementos de la DB se hace con un **softdelete**. Al final decidí no implementarlo y dejar el borrado directo de la DB.
2. Pedían CRUD para todos los dominios. Para el dominio **USER** consideré implementar un atributo **ROL** para agregar validación de usuario y asignación de permisos. El cual al final no implementé. Además, no estaba seguro si hacer los 4 principales endpoints de CRUD pero hice los que considero "generales".
3. El dominio **LOCATIONS** dice: _"Poder listar, modificar y eliminar las locations CREADAS POR EL USUARIO"_, así que agregué el atributo `createdBy` y un middleware para autenticar al usuario y darle acceso solo a aquellas locations que él haya creado.
4. Piden subir el `.env`, decidí dejar los valores reales porque así lo entendí. Comprendo que esto está prohibido hacer en producción.
5. En el dominio **ORDERS** los valores en la DB son todos **ObjectID**. Al momento de generar el endpoint `getById` o `getAll`, decidí hacer **populate** a los atributos que consideraba más relevantes.
6. Para el dominio **TRUCKS**, el atributo **plates** tambien se considera como unico.
7. En el dominio **LOCATIONS** la acción de modificar una location ya creada. La desarrolle de tal forma que solo se pudiera cambiar el **place_id**, luego hacer la petición a la API y actualizar los datos.
