// Importamos la configuración de la base de datos (el pool con promesas creado anteriormente)
const db = require('../Config/DataBaseConfig');

// Controlador para obtener la lista de libros desde la base de datos
// Usamos async/await porque la consulta es asíncrona
const ObtenerLibros = async (req, res) => {
    try {
        // Realizamos la consulta SQL.
        // db.query() devuelve un array: [resultado, metadata]
        // Usamos destructuring para obtener solo "libros" (el resultado de la consulta).
        const [libros] = await db.query(
            'SELECT * FROM libros ORDER BY id DESC'  // Consulta: selecciona todos los libros ordenados por id descendente
        );

        // Enviamos la respuesta al cliente en formato JSON
        res.json(
            {
                success: true,           // Indicamos que la operación fue exitosa
                count: libros.length,    // Número de registros obtenidos
                data: libros             // Los datos de los libros
            }
        );

    } catch (error) {
        // Si ocurre un error en la consulta, lo mostramos en la consola
        console.error("ERROR AL OBTENER LIBROS DESDE LA BASE DE DATOS.");

        // Y devolvemos una respuesta JSON con información del error
        res.json(
            {
                success: false,          // Indicamos que la operación falló
                mensaje: "ERROR AL OBTENER LIBROS", // Mensaje personalizado
                error: error.message     // Error real devuelto por MySQL (ojo: es error.message, no error.mensaje)
            }
        );
    }
}
// 1. Definimos una función constante llamada ObtenerLibrosId.
//    Es una función asíncrona porque dentro usaremos await para la consulta a la DB.
const ObtenerLibrosId = async (req, res) => {
    try {
        // 2. Extracción del parámetro `id` desde la ruta (req.params).
        //    Ejemplo: si la ruta es /libros/7 entonces id === "7" (nota: será string).
        const { id } = req.params;

        // 3. Ejecutamos la consulta a la base de datos para buscar el libro por su id.
        //    - Usamos un placeholder '?' y pasamos [id] para evitar inyección SQL (consulta parametrizada).
        //    - IMPORTANTE: el valor retornado por db.query depende del cliente MySQL que uses.
        //      En mysql2/promise suele devolverse: [rows, fields], por eso usamos destructuring [libro].
        //    - Si usas otro cliente, adapta la destructuración según corresponda.
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);

        // 4. Comprobación de existencia: si el array `libro` está vacío => no se encontró el registro.
        //    - libro.length === 0 significa: "no hay filas devueltas".
        //    - Usamos === para comparación estricta.
        if (libro.length === 0) {
            // 5. Retornamos un estado 404 (Not Found) y un JSON indicando que no se encontró.
            //    - success: false (es lógico marcar false cuando no existe el recurso).
            //    - mensaje: texto legible para quien consume la API.
            return res.status(404).json({
                success: false,
                mensaje: "LIBRO NO ENCONTRADO"
            });
        }

        // 6. Si llegamos aquí significa que `libro` tiene al menos una fila.
        //    - Normalmente solo habrá un resultado porque consultamos por id.
        //    - Devolvemos la primera fila libro[0] en el campo `data`.
        res.json({
            success: true,
            mensaje: "LIBRO ENCONTRADO",
            data: libro[0]
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
};


const CrearLibro = async (req, res) => {
    try {

        // Biene en el body
        const { titulo, autor, isbn, editorial, anio_publicacion, id_categoria } = req.body;

        if (!titulo || !autor) {
            return res.status(400).json({
                success: true,
                mensaje: "TITULO Y AUTOR SON ABLIGATORIOS"
            });
        }

        const [resultado] = await db.query(
            'INSERT INTO libros(titulo, autor, isbn, editorial ,anio_publicacion, id_categoria) VALUES (?,?,?,?,?,?)',
            [titulo, autor, isbn, editorial, anio_publicacion, id_categoria]
        );

        res.status(201).json({
            success: true,
            mensaje: "LIBRO CREADO EXITOSAMENTE",
            data: {
                id: resultado.insertId,
                titulo,
                autor,
                isbn,
                editorial,
                anio_publicacion,
                id_categoria
            }
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


const ActualizarLibro = async (req, res) => {
    try {

        // Biene en el body
        const { id } = req.params;
        const { titulo, autor, isbn, editorial, anio_publicacion, id_categoria } = req.body;

        // Verificamos si existe el libro
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "LIBRO NO ENCONTRADO"
            });
        }

        await db.query(
            'UPDATE libros SET titulo = ?, autor = ?, isbn = ?, editorial = ?, anio_publicacion = ?, id_categoria = ? WHERE id = ?',
            [titulo, autor, isbn, editorial, anio_publicacion, id_categoria, id]
        );

        res.status(201).json({
            success: true,
            mensaje: "LIBRO ACTUALIZADO EXITOSAMENTE",
            data: {
                id,
                titulo,
                autor,
                isbn,
                editorial,
                anio_publicacion,
                id_categoria
            }
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

const EliminarLibro = async (req, res) => {
    try {

        // Biene en el body
        const { id } = req.params;

        // Verificamos si existe el libro
        const [libro] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "LIBRO NO ENCONTRADO"
            });
        }

        await db.query('DELETE FROM libros WHERE id = ?', [id]);


        res.status(201).json({
            success: true,
            mensaje: "LIBRO ELIMINADO EXITOSAMENTE"


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
    ObtenerLibros,
    ObtenerLibrosId,
    CrearLibro,
    ActualizarLibro,
    EliminarLibro,
    ObtenerLibrosPrCategoria

    // ...
    // Aquí se podrían exportar más funciones relacionadas con libros, por ejemplo: CrearLibro, EliminarLibro, etc.
}
