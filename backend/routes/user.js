import express from "express";
import { followUnfollowUser, getSuggestedUser, getUserProfile, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// protectRoute is added so that below functionalities only work if user is authenticated.
router.get(`/profile/:username`, protectRoute, getUserProfile)
router.get(`/suggested`, protectRoute, getSuggestedUser)
router.post(`/follow/:id`, protectRoute, followUnfollowUser)
router.post(`/update`, protectRoute, updateUser)

export default router;