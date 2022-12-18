import Carpark from "../models/CarparkModel.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

export const getCarparkDb = async (req, res) => {
    try {
        const carpark = await Carpark.findAll();
        res.json(carpark);
    } catch (error) {
        console.log(error);
    }
};


export const getTakenParks = async (req, res) => {
    try {
        const carpark = await Carpark.findAll({
            where: {
                user_id: {
                    [Op.gt]: -1
                }
            }
        });
        res.json(carpark);
    } catch (error) {
        console.log(error);
    }
};

export const getFreeParks = async (req, res) => {
    try {
        const carpark = await Carpark.findAll({
            where: {
                user_id: -1
            }
        });
        res.json(carpark);
    } catch (error) {
        console.log(error);
    }
};

export const findParkedCars = async (req, res) => {
    try {
        const carpark = await Carpark.findAll({
            where: {
                user_id: req.body.user_id
            }
        });
        res.json(carpark);
    } catch (error) {
        console.log(error);
    }
};

export const updateCarparks = async (req, res) => {

    try {
        const updatedRows = await Carpark.update(
            {
                user_id: req.body.user_id,
                number_plate: req.body.number_plate,
            },
            {
                where: { id: req.body.id },
            }
        );

        res.status(200);
        res.json(updatedRows);
    } catch (error) {
        console.log(error);
    }
};