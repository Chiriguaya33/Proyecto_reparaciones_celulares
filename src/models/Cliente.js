import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Importar el objeto Sequelize

const Cliente = sequelize.define('Clientes', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    direccion: {
        type: DataTypes.TEXT
    }
});

export default Cliente;