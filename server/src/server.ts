import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan'
import router from './router.js';
import db from './config/db.js';
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions} from './config/swagger.js';

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

// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin == process.env.FRONTEND_URL)
        {
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server