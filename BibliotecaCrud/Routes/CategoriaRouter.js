// Importamos express para crear el enrutador
const express = require("express");

// Creamos un objeto "router" que nos permite definir rutas de manera modular
const router = express.Router();

// Importamos las funciones del controlador de libros (en este caso solo ObtenerLibros)
const {
   
    ObtenerLibrosPrCategoria

    // Aquí se pueden importar otras funciones como CrearLibro, EliminarLibro, etc.
} = require("../Controllers/CategoriaController");

// Definimos la ruta GET en la raíz del recurso "/"
// Cuando alguien haga una petición GET a "/libros", se ejecutará la función ObtenerLibros

router.get("/:id", ObtenerLibrosPrCategoria);
/*
    Ejemplo para futuras rutas:

    // Ruta POST -> para crear un nuevo libro
    router.post("/", CrearLibro);

    // Ruta DELETE -> para eliminar un libro por id
    router.delete("/:id", EliminarLibro);

    // Ruta PUT -> para actualizar un libro por id
    router.put("/:id", ActualizarLibro);
*/

// Exportamos el router para que pueda ser usado en app.js o server.js
module.exports = router;
