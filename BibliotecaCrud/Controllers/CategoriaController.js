// Importamos la configuración de la base de datos (el pool con promesas creado anteriormente)
const db = require('../Config/DataBaseConfig');


const ObtenerLibrosPrCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await db.query("SELECT * FROM categorias WHERE  id = ?", [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "CATEGORIA NO ENCONTRADO"
            });
        }
        const [libros] = await db.query(
            'SELECT * FROM libros WHERE id_categoria = ?',
            [id]
        );

        res.status(201).json({
            success: true,
            count: libros.length,
            data: libros,
            categoria: categoria[0]


        });
    } catch (error) {
        // 7. Captura de errores: cualquier excepción lanzada arriba (consulta, crash, etc.).
        //    - Respondemos con 500 (Internal Server Error).
        //    - error.message es la propiedad estándar con el texto del error.
        res.status(500).json({
            success: false,
            mensaje: "ERROR AL OBTENER EL LIBRO",
            error: error.message,
        });
    }
}




// Exportamos el controlador para poder usarlo en las rutas
module.exports = {
    ObtenerLibrosPrCategoria
    // ...
    // Aquí se podrían exportar más funciones relacionadas con libros, por ejemplo: CrearLibro, EliminarLibro, etc.
}
