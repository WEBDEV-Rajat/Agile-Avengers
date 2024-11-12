import { Router } from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getallTransactions,
  getallExporInc,
  getallTransactionsofaCategory,
  transactionDetails,
  getFilteredTransactions,
  totalTransaction,
  getincomePercentage,
  getExpensePercentage
} from "../Controllers/Transaction.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
import { verify } from "crypto";
const router = Router();

router.route("/add-transaction").post(verifyJWT, addTransaction);
router.route("/edit-transaction/:id").post(verifyJWT, editTransaction);
router.route("/delete-transaction/:id").delete(verifyJWT, deleteTransaction);
router.route("/get-all-transactions").get(verifyJWT, getallTransactions)
router.route("/get-all-transactions/:type").get(verifyJWT, getallExporInc)
router.route("/get-all-transactions-cat").post(verifyJWT,getallTransactionsofaCategory)
router.route("/get-details/:id").get(verifyJWT, transactionDetails)
router.route("/get-all").post(verifyJWT, getFilteredTransactions)
router.route("/get-total").get(verifyJWT, totalTransaction)
router.route("/get-income-per").get(verifyJWT, getincomePercentage)
router.route("/get-expense-per").get(verifyJWT, getExpensePercentage)
export default router;
