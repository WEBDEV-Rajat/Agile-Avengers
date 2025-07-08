import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
import {
  getFinancialOverview,
  getTransactionTrend,
  getTopTransactions,
  getMostUsedCategory,
  getSavingsRate,
  getAmountSpendPerCategory,
  getAmountIncomePerCategory
} from "../Controllers/analysis.controller.js";

const router = Router();

router.route("/overview").post(verifyJWT, getFinancialOverview);

router.route("/trend").post(verifyJWT, getTransactionTrend);

router.route("/top-transactions").post(verifyJWT, getTopTransactions);

router.route("/most-used-category").get(verifyJWT, getMostUsedCategory);

router.route("/savings-rate").get(verifyJWT, getSavingsRate);

router.route("/category/expense").post(verifyJWT, getAmountSpendPerCategory);

router.route("/category/income").post(verifyJWT, getAmountIncomePerCategory);

export default router;