<h1 align="center">
  <p align="center">Pre entrega backend avanzado II 70070 - Francisco Retamar</p>
  <img src="https://kinsta.com/es/wp-content/uploads/sites/8/2021/12/back-end-developer-1024x512.png" alt="Backend Coderhouse"></a>
</h1>

## Tabla de Contenidos
1. [Instalación]
2. [Configuración]
3. [Uso]
4. [Estructura del Proyecto]
5. [Desarrollo]

## Instalación

- Node.js v14.17.0
  
### Dependencias 
   - bootstrap
   - dirname
   - express
   - express-handlebars
   - express-websocket
   - mongodb
   - mongoose
   - mongoose-paginate-v2
   - socket.io
   - connect-mongo
   - cookies
   - cookie-parser
   - express-session
   - session-file-store

         
### Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/fretamar/coder-backend-70070-retamar
2. Navegar hacia directorio principal
   ```sh
   cd backendII
3. Instalar dependencias
   ```sh
   npm install

### Uso

`PORT`: El puerto en el que la aplicación se ejecutará es: 8080.\
`DB_URI`: mongodb+srv://franretamar123:Knd281195.-@backendii.97uyg.mongodb.net/?retryWrites=true&w=majority&appName=BackendII

```sh
npm start
```

### Estructura del proyecto
```
proyecto/
📦src
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┗ 📜user.model.js
 ┣ 📂routes
 ┃ ┣ 📜sessions.js
 ┃ ┣ 📜users.router.js
 ┃ ┗ 📜views.js
 ┣ 📂views
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜main.hbs
 ┃ ┣ 📜login.handlebars
 ┃ ┣ 📜profile.handlebars
 ┃ ┗ 📜register.handlebars
 ┣ 📜app.js
 ┗ 📜utils.js
```

### Desarrollo

La persistencia de los datos está hecha en MongoDB.
