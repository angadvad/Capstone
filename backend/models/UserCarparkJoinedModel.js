// SELECT users.name,carpark.id,carpark.user_id,carpark.number_plate,carpark.parking_space FROM users, carpark
// where users.id = carpark.user_id

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserCarparkJoinedModel = db.define('users, carpark',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    number_plate:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default UserCarparkJoinedModel;