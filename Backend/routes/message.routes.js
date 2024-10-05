import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

//when we havea post request we run this function ProtectRoute -- for autherization that user is loggedin
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute, sendMessage);

export default router;