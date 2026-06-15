import { Router } from "express";
import {
  isLogOut,
  userLogin,
  userRegister,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/logout", isLogOut);

export const userRouter = router;
