import {Sequelize} from "sequelize";

const db = new Sequelize('carparkdatabase','root','admin',{
    host: "localhost",
    dialect: "mysql"
});

export default db;