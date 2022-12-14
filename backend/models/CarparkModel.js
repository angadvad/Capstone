import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Carpark = db.define('carpark',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true            
    },
    user_id:{
        type: DataTypes.INTEGER            
    },
    number_plate:{
        type: DataTypes.STRING
    },
    parking_space:{
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName:true
});

export default Carpark;
    