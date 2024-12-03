import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Importar el objeto Sequelize

const Tecnico = sequelize.define('Tecnicos', {
    id_tecnico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING
    }
});

export default Tecnico;