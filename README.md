# Be Fast BE (Backend)

## Tecnologías Utilizadas

- **Express.js**: Un framework de servidor web para Node.js que facilita la creación de aplicaciones web y APIs de manera rápida y sencilla.

- **MongoDB**: Una base de datos NoSQL que ofrece flexibilidad y una escalabilidad eficiente, ideal para manejar las operaciones de datos de la aplicación.

- **Firebase Authentication**: Utilizado para autenticar y validar el número de teléfono registrado y enviarle un mensaje de texto de confirmación.

- **Firebase Cloud Messaging (FCM)**: Utilizado para enviar notificaciones push al usuario.

**Para poder correr el servidor necesitas configurar el Archivo `.env`**:

1. Crea un archivo `.env` en la raíz del proyecto.

```
touch .env
```

2. Agrega la cadena de conexión a MongoDB. (La puedes encontrar en mongoDB Atlas)

```
MONGO_URI=tu_cadena_de_conexion_a_mongodb
```

3. Agrega el puerto 3000

```
PORT=3000
```

4. Agrega la la API de google, que la puedes encontrar en Google Cloud Platform

```
GOOGLE_API_KEY=AIzaSy*************************rxGGOdIA
```
