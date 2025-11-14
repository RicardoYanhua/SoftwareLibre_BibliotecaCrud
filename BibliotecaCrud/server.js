

require("dotenv").config();

// Importamos las rutas de libros
const LibroRoutes = require("./Routes/LibroRoutes");
const CategoriaRoutes = require("./Routes/CategoriaRouter");

// Importamos express (framework para crear el servidor web) y cors (para habilitar peticiones desde otros dominios)
const express = require("express");
const cors = require("cors");

// Creamos la aplicación con express
const app = express();

// Definimos el puerto. Si no existe en .env, se usa el 3000 como valor por defecto
const PORT = process.env.PORT || 3000;

// Middleware que permite solicitudes CORS (Cross-Origin Resource Sharing)
// Esto hace que la API pueda ser consumida desde cualquier cliente (React, Angular, etc.)
app.use(cors());

// Middleware para que express entienda JSON en las peticiones
app.use(express.json());

// Middleware para procesar datos enviados desde formularios (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Montamos las rutas de libros en el prefijo /api/libros
// Ejemplo: GET localhost:3000/api/libros
app.use('/api/libros', LibroRoutes);
app.use('/api/categorias', CategoriaRoutes);

// Ruta principal de prueba (GET localhost:3000/)
// Devuelve un mensaje JSON con información básica de la API
app.get("/", (req, res) => {
    res.json({
        mensaje: "API DE BIBLIOTECA - CRUD LIBROS"
    });
});

// Iniciamos el servidor en el puerto configurado
app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EXITOSAMENTE");
    console.log(`----> PUERTO: ${PORT}`);
});
