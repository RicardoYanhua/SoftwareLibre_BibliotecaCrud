const db = require('../config/database')
//ObtenerLibros
const obtenerLibros = async (req, res) => {
    try {

        const [libros] = await
            db.query('SELECT * FROM libros ORDER BY id DESC');
        res.json({
            success: true,
            count: libros.length,
            data: libros
        })

    } catch (error) {

        res.json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
};
const obtenerLibroPorId = async (req, res) => {
    try {

        const { id } = req.params;
        const [libro] = await
            db.query('SELECT * FROM libros WHERE id= ?', [id]);
        if (libro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libro no encontrado"
            });
        }
        res.json({
            success: true,
            data: libro[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
};

const crearLibro = async (req, res) => {
    try {

        const { titulo, autor, isbn, editorial,idcategoria } = req.body;
        if (!titulo || !autor) {
            return res.status(400).json({
                success: false,
                mensaje: "Título y autor son obligatorios"
            })
        }
        const [resultado] = await db.query(
            'INSERT INTO libros(titulo,autor,isbn,editorial,idcategoria) VALUES (?,?,?,?,?)',
            [titulo, autor, isbn, editorial,idcategoria]
        );

        res.status(201).json({
            success: true,
            mensaje: "Libro creado exitosamente",
            data: {
                id: resultado.insertId,
                titulo,
                autor,
                isbn,
                editorial,
                idcategoria
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}

const actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, isbn, editorial,idcategoria } = req.body;
        const [libroExistente] = await db.query('SELECT * FROM libros WHERE id= ?', [id])
        if (libroExistente.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libro no encontrado"
            });
        }
        
        await db.query(
            'UPDATE libros set titulo=?, autor=?, isbn=?, editorial=?, idcategoria=? where id=?',
            [titulo, autor, isbn, editorial,idcategoria,id]
        );

        res.status(201).json({
            success: true,
            mensaje: "Libro actualizado exitosamente",
            data: {
                id,
                titulo,
                autor,
                isbn,
                editorial,
                idcategoria

            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al modificar el libro",
            error: error.mensaje
        })
    }
}

const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params;        
        const [libroExistente] = await db.query('SELECT * FROM libros WHERE id= ?', [id])
        if (libroExistente.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "Libro no encontrado"
            });
        }
        
        await db.query(
            'DELETE FROM libros where id=?',
            [id]
        );

        res.status(201).json({
            success: true,
            mensaje: "Libro eliminado exitosamente",            
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al eliminar el libro",
            error: error.mensaje
        })
    }
}

const obtenerLibroPorIdCategoria = async (req, res) => {
    try {

        const { id } = req.params;
        const [categoria] = await
            db.query('SELECT * FROM categoria WHERE idcategoria= ?', [id]);
        if (categoria.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: "categoria no encontrada"
            });
        }

        const [libros] = await db.query('select * from libros where idcategoria=?',[id]) 


        res.json({
            success: true,
            categoria:categoria[0],
            count: libros.length,
            data: libros
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
};



module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorIdCategoria
}