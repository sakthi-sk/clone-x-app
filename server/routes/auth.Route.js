import express from "express"
import {
  getMe,
  login,
  logout,
  signup,
  refreshAccessToken,
} from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";
const router=express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshAccessToken);
router.get("/me", protectRoute, getMe);


export default router


