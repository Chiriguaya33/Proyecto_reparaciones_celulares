import { Sequelize } from 'sequelize'; 
import { HOST_DB, USER_DB, DATABASE, PASSWORD, PORT_DB } from "../config/config.js";

const sequelize = new Sequelize(DATABASE, USER_DB, PASSWORD, {
    host: HOST_DB,
    dialect: 'mysql', 
    port: PORT_DB 
});

export default sequelize; 