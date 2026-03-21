import express from 'express';
import router from './router.js';
import db from './config/db.js';
import colors from 'colors'

// Conectar a base de datos
export async function connectDB() 
{
    try{
        await db.authenticate(); 
        db.sync(); 
        //console.log(colors.blue('Conexión exitosa a la BD'))
    }catch(error){        
        console.log(colors.red.bold('Hubo un error al conectar la BD'));
    }
}

connectDB()

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router);

server.get('/api', (req,res) => {
    res.json({msg: 'Desde API'})
})
export default server