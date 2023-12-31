# Be Fast BE (Backend)

## Tecnologías Utilizadas

- **Express.js**: Un framework de servidor web para Node.js que facilita la creación de aplicaciones web y APIs de manera rápida y sencilla.
- **MongoDB**: Una base de datos NoSQL que ofrece flexibilidad y una escalabilidad eficiente, ideal para manejar las operaciones de datos de la aplicación.
- **Firebase Auth**: Utilizado para autenticar y validar el número de teléfono registrado y enviarle un mensaje de texto de confirmación.
- **Firebase Cloud Messaging (FCM)**: Utilizado para enviar notificaciones push al usuario.

**Para poder correr el servidor necesitas configurar el Archivo `.env`**:

- Crea un archivo `.env` en la raíz del proyecto.
- Agrega la cadena de conexión a MongoDB. Por ejemplo:
  ```
  MONGO_URI=tu_cadena_de_conexion_a_mongodb
  ```
- La tu_cadena_de_conexion_a_mongodb la puedes encontrar en la cuenta de MongoDB está asociada al correo `befastcol@gmail.com`.