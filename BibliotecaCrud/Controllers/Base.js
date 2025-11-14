const db = require('../Config/DataBaseConfig');
const SQL_DB_TABLE = 'table_name';

/* ============================================================
   (GET) /Api/Entidad/
   Obtener todos los registros
============================================================ */
const ObtenerListaCompleta = async (req, res) => {
    try {
        const [DB_Lista] = await db.query('SELECT * FROM ' + SQL_DB_TABLE + ' ORDER BY id DESC');
        res.json({
            success: true,
            count: DB_Lista.length,
            data: DB_Lista
        });
    } catch (error) {
        console.error('Error en obtener los registros desde la base de datos.');
        res.json({
            success: false,
            mensaje: 'Error al obtener los registros.',
            error: error.message
        });
    }
};

/* ============================================================
   (GET) /Api/Entidad/:id
   Obtener registro por ID
============================================================ */
const ObtenerPorParametro = async (req, res) => {
    try {
        const { id } = req.params;
        const [DB_Lista] = await db.query('SELECT * FROM ' + SQL_DB_TABLE + ' WHERE id = ?', [id]);

        if (DB_Lista.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'El registro no fue encontrado o no existe.'
            });
        }
        res.json({
            success: true,
            mensaje: '¡ Registro Encontrado !',
            data: libro[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el registro.',
            error: error.message,
        });
    }
};

/* ============================================================
   (POST) /Api/Entidad/
   Crear nuevo registro
============================================================ */
const CrearNuevoRegistro = async (req, res) => {
    try {

        // Definimos las varaibles de JSON (Body)
        const { titulo, autor, isbn, editorial, anio_publicacion, id_categoria } = req.body;

        // Validaciones de variables
        if (!titulo || !autor) {
            return res.status(400).json({
                success: true,
                mensaje: "TITULO Y AUTOR SON ABLIGATORIOS"
            });
        }

        const [RegistroCreado] = await db.query(
            ' INSERT INTO ' + SQL_DB_TABLE
            + ' ( '
            + ' titulo, '
            + ' autor, '
            + ' isbn, '
            + ' editorial, '
            + ' anio_publicacion, '
            + ' id_categoria) '
            + ' VALUES (?,?,?,?,?,?) ',
            [titulo, autor, isbn, editorial, anio_publicacion, id_categoria]
        );

        res.status(201).json({
            success: true,
            mensaje: '¡ Se ha creado un nuevo registro exitosamente !',
            data: {
                id: RegistroCreado.insertId,
                titulo,
                autor,
                isbn,
                editorial,
                anio_publicacion,
                id_categoria
            }
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener el registro.",
            error: error.message,
        });
    }
}

/* ============================================================
   (PUT) /Api/Entidad/:id
   Actualizar registro existente
============================================================ */
const ActualizarRegistro = async (req, res) => {
    try {

        const { id } = req.params;
        const { titulo, autor, isbn, editorial, anio_publicacion, id_categoria } = req.body;

        // Verificamos si existe el libro
        const [RegistrosEncontrados] = await db.query('SELECT * FROM ' + SQL_DB_TABLE + ' WHERE id = ?', [id]);
        if (RegistrosEncontrados.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'El registro no fue encontrado o no existe.'
            });
        }

        await db.query(
            ' UPDATE ' + SQL_DB_TABLE
            + ' SET '
            + ' titulo = ?, '
            + ' autor = ?, '
            + ' isbn = ?, '
            + ' editorial = ?, '
            + ' anio_publicacion = ?, '
            + ' id_categoria = ? '
            + ' WHERE id = ?',
            [titulo, autor, isbn, editorial, anio_publicacion, id_categoria, id]
        );

        res.status(201).json({
            success: true,
            mensaje: '¡ Registro actualizado correctamente !',
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
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener el registro.",
            error: error.message,
        });
    }
}

/* ============================================================
   (DELETE) /Api/Entidad/:id
   Eliminar registro por ID
============================================================ */
const EliminarRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        const [ Registro ] = await db.query('SELECT * FROM ' + SQL_DB_TABLE + ' WHERE id = ?', [id]);
        if (Registro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'El registro no fue encontrado o no existe.'
            });
        }
        await db.query('DELETE FROM ' + SQL_DB_TABLE + ' WHERE id = ?', [id]);
        res.status(201).json({
            success: true,
            mensaje: "Se ha eliminado el libro correctamente"
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener el registro.",
            error: error.message,
        });
    }
}



/* ============================================================
   (GET) /Api/Entidad/Buscar?autor=NombreAutor
   Buscar registros por autor
============================================================ */
const BuscarPorAutor = async (req, res) => {
    try {
        const { autor } = req.query;

        if (!autor) {
            return res.status(400).json({
                success: false,
                mensaje: 'Debe proporcionar un parámetro para realizar la búsqueda.'
            });
        }

        const [Busqueda] = await db.query(
            'SELECT * FROM ' + SQL_DB_TABLE + ' WHERE autor LIKE ? ORDER BY id DESC ',
            ['%'+ autor +'%']
        );

        if (Busqueda.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'No se encontraron registros con el texto de busqueda insertado.'
            });
        }

        res.json({
            success: true,
            mensaje: 'Búsqueda realizada correctamente.',
            count: Busqueda.length,
            data: Busqueda
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al realizar la búsqueda.',
            error: error.message
        });
    }
};

module.exports = {
    ObtenerListaCompleta,
    ObtenerPorParametro,
    CrearNuevoRegistro,
    ActualizarRegistro,
    EliminarRegistro,
    BuscarPorAutor
    // ...
}