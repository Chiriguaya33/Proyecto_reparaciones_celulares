import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import clienteRoutes from './routes/clienteRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import tecnicoRoutes from './routes/tecnicoRoutes.js';
import reparacionRoutes from './routes/reparacionRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import sequelize from './database/db.js'; // Importar el objeto Sequelize

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use(clienteRoutes);
app.use(equipoRoutes);
app.use(tecnicoRoutes);
app.use(reparacionRoutes);
app.use(usuarioRoutes);

// Probar la conexión a la base de datos
async function conectarDB() {
    try {
        await sequelize.authenticate(); // Usar sequelize.authenticate()
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error); 1
    }
}
conectarDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});