import express from "express"
import { countByCity, createHotel, deleteHotel, getallHotels, getHotel, updateHotel } from "../controllers/hotelController.js";
import { VerifyAdmin, VerifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE 
router.post("/", VerifyAdmin, createHotel)
// // UPDATE
router.put("/:id", VerifyAdmin ,updateHotel)
// DELETE
router.delete("/:id", VerifyAdmin, deleteHotel)

// // GET
// GETALL
router.get("/", getallHotels)

router.get("/countByCity", countByCity);

router.get("/:id", VerifyUser, getHotel)

export default router;