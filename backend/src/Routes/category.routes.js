import { Router } from "express";

const router = Router();

import { addCategory, deletecategory,  getAllexpenseCategory, getAllincomeCategory ,} from "../Controllers/category.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
router.route("/add-category").post(verifyJWT,addCategory);
router.route("/delete-category/:id").delete(verifyJWT,deletecategory);
router.route("/get-all-income").get(verifyJWT,getAllincomeCategory)
router.route("/get-all-expense").get(verifyJWT,getAllexpenseCategory)

export default router