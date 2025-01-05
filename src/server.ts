import express from 'express';
import router from './router';
import db from './config/db'

// Conectar a Base de Datos
async function connectDB() {
    try {
       await db.authenticate()
       db.sync()
       console.log('Conexión exitosa a la BD'); 
    } catch (error) {
        console.log(error);
        console.log('Hubo un error al conectar al BD');
    }
}
connectDB();
const server = express();

server.use('/api/productos', router)



export default server;