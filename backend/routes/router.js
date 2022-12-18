import express from "express";
import { getUsers, Register, Login, Logout} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getCarparkDb , getTakenParks, getFreeParks, updateCarparks, findParkedCars} from "../controllers/Carpark.js"
const router = express.Router();

router.get('/carpark',verifyToken, getCarparkDb);
router.get('/freeparks',getFreeParks);
router.post('/updatecarpark',updateCarparks);
router.post('/findparkedcars',findParkedCars);
router.get('/takenparks',getTakenParks);
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
export default router;