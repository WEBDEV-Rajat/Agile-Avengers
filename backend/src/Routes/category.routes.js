import { Router } from "express";

const router = Router();

import { addCategory } from "../Controllers/category.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
router.route("/add-category").post(verifyJWT,addCategory);

export default router