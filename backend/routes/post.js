import express from "express";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getSavedPosts, getUserPosts, likeUnlikePost, saveUnsavePost } from "../controllers/post.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/following", protectRoute, getFollowingPosts); // Getting posts from those whom I'm following.
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/all", protectRoute, getAllPosts);

router.post("/create", protectRoute, createPost);

router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);

router.get("/saves/:id", protectRoute, getSavedPosts);
router.post("/save/:id", protectRoute, saveUnsavePost);

router.post("/comments/:id", protectRoute, commentOnPost);
router.post("/:id", protectRoute, deletePost);

export default router;