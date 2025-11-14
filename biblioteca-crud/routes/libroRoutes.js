const express = require('express');
const router = express.Router();
const {
obtenerLibros,
obtenerLibroPorId,
crearLibro,
actualizarLibro,
eliminarLibro,
obtenerLibroPorIdCategoria
} = require('../controllers/libroController');

//RUTAS CRUD
router.get('/',obtenerLibros);
//router.get('/:id',obtenerLibroPorId);
router.post('/',crearLibro);
router.put('/:id',actualizarLibro);
router.delete('/:id',eliminarLibro);
router.get('/librosByCategoria/:id',obtenerLibroPorIdCategoria)
module.exports=router;