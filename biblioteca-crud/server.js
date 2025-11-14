require('dotenv').config();
const express= require('express');
const cors = require('cors');


const libroRoutes = require('./routes/libroRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/libros', libroRoutes);
app.use('/api/categorias', categoriaRoutes);


app.get('/', (req,res)=>{
    res.json({
        mensaje:"API BIBLIOTECA - CRUD"
    })
})
 
app.listen(PORT,()=>{
    console.log(`Servidor inicializado en el http://localhost:${PORT}`)
})