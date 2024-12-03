import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Importar el objeto Sequelize
import Cliente from './Cliente.js';

const Equipo = sequelize.define('Equipos', {
    id_equipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false

    },
    imei: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion_falla: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente'
        }
    }
});

// Definir la relación entre Equipo y Cliente
Equipo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

export default Equipo;