import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import {
  createComment,
  createPost,
  deletePost,
  linkUnlikePost,
  getAllPosts,
  getLikedPost,
  getFollowingPost,
  getUserPost,
  getComment,
} from "../controllers/post.controllers.js";
const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPost);
router.get("/user/:username", protectRoute, getUserPost);
router.get("/likes", protectRoute, getLikedPost);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute,linkUnlikePost);
router.post("/comment/:id", protectRoute,createComment);
router.delete("/:id", protectRoute,deletePost);
router.get("/comment/:id", protectRoute, getComment);


export default router;
