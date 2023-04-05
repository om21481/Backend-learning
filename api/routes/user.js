import express from "express"
import {deleteusers, getallUsers, getusers, updateusers } from "../controllers/userController.js";
import {VerifyAdmin, VerifyToken, VerifyUser} from "../utils/VerifyToken.js";
const router = express.Router();

//  CHECK AUTHENTICATION
router.post("/checkAuthentication", VerifyToken, (req, res)=>{
    res.json(req.user)
})
router.post("/checkUser/:id", VerifyUser, (req, res)=>{
    res.json(req.user);         // we can't return from a middleware
})
router.post("/checkAdmin", VerifyAdmin, (req, res)=>{
    res.json(req.user);         // we can't return from a middleware
})

// UPDATE
router.put("/:id", VerifyUser, updateusers)
// DELETE
router.delete("/:id", VerifyUser, deleteusers)

// GET
router.get("/:id", VerifyAdmin, getusers)
// GETALL
router.get("/", VerifyAdmin, getallUsers)


export default router;