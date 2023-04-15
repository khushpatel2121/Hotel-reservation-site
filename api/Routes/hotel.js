import express from "express"
import { countByType, countByCity, createHotel, deleteHotel, getAllHotel, getHotel, updateHotel,getRooms } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js"
import { verifyAdmin } from "../utils /verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel)

//update 
router.put("/:id",verifyAdmin, updateHotel)

//delete
router.delete("/:id" ,verifyAdmin, deleteHotel)

//get
router.get("/find/:id", getHotel)

//getALL
router.get("/",  getAllHotel)
router.get("/countbycities", countByCity);
router.get("/countbytype", countByType);
router.get("/rooms/:id",getRooms)

export default router ;