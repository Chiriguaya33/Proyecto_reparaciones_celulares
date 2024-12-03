import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Importar el objeto Sequelize
import Equipo from './Equipo.js';
import Tecnico from './Tecnico.js';

const Reparacion = sequelize.define('Reparaciones', {
    id_reparaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    equipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipo,
            key: 'id_equipo'
        }
    },
    fecha_ingreso: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_salida: {
        type: DataTypes.DATEONLY
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    costo_repuestos: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    costo_servicio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    tecnico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tecnico,
            key: 'id_tecnico'
        }
    }
});

// Definir las relaciones
Reparacion.belongsTo(Equipo, { foreignKey: 'equipo_id' });
Reparacion.belongsTo(Tecnico, { foreignKey: 'tecnico_id' });

export default Reparacion;