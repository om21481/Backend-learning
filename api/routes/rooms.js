import express from "express"
import { createRoom } from "../controllers/roomController.js";
const router = express.Router();

// CREATE 
router.post("/:hotelid/:roomid", createRoom)
// UPDATE
router.put("/:id", VerifyAdmin ,updateRoom)
// DELETE
router.delete("/:id", VerifyAdmin, deleteRoom)

// GET
router.get("/:id", VerifyUser, getRoom)
// GETALL
router.get("/", VerifyUser, getallRoom)


export default router;