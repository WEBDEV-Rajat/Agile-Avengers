import { Router } from "express";

const router = Router();

import { addCategory, deletecategory ,} from "../Controllers/category.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
router.route("/add-category").post(verifyJWT,addCategory);
router.route("/delete-category/:id").delete(verifyJWT,deletecategory);

export default router