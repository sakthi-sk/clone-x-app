import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  followUnFollowUser,
  getProfile,
  getSuggestedUser,
  UpdateUser,
} from "../controllers/user.controllers.js";


const router = express.Router();

router.get("/profile/:username",protectRoute, getProfile);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/update", protectRoute, UpdateUser);


export default router;
