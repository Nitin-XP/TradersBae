import express from "express";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
// router.delete("/:id", protectRoute, deleteNotification); // Add if you want to implement this!

export default router;