import { Router } from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getallTransactions,
  getallExporInc,
  getallTransactionsofaCategory,
  transactionDetails,
  getFilteredTransactions
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
export default router;
