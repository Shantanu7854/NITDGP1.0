import express from "express";
import { register, login } from "../controllers/auth.js";

// jwt authentication for routes
import authenticator from "../middleware/authentication.js";

const router = express.Router();

router.route("/user/login").post(login);
router.route("/user/register").post(register);

export default router;
