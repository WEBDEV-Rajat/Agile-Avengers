import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
const router = Router();
import { createBudget, getBudgets } from "../Controllers/budget.controller.js";


router.route("/add-new").post(verifyJWT, createBudget);
router.route("/get-details").get(verifyJWT, getBudgets);
export default router