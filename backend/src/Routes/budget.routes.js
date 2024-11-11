import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
const router = Router();
import { checkBudgetUsage, createBudget, deleteBudget, getBudgets, updateBudget } from "../Controllers/budget.controller.js";


router.route("/add-new").post(verifyJWT, createBudget);
router.route("/get-details").get(verifyJWT, getBudgets);
router.route("/update-budget/:budgetId").post(verifyJWT, updateBudget);
router.route("/delete/:budgetId").delete(verifyJWT, deleteBudget);
router.route("/get-usage").post(verifyJWT, checkBudgetUsage)
export default router