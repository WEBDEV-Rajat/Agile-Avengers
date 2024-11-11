import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
import { addTransaction, ChangeStatusRecurringTransaction, deleteRecurringTransaction, getallRecurringTransactions, getUpcomingTransactions, updateRecurringTransaction } from "../Controllers/reoccuringTransaction.controller.js";
const router = Router();
router.route("/add-transaction").post(verifyJWT, addTransaction);
router.route("/get-all").get(verifyJWT,getallRecurringTransactions);
router.route("/update-transaction/:transactionId").put(verifyJWT,updateRecurringTransaction);
router.route("/change-status/:transactionId").put(verifyJWT,ChangeStatusRecurringTransaction)
router.route("/get-upcoming").get(verifyJWT, getUpcomingTransactions)
router.route("/delete/:transactionId").delete(verifyJWT, deleteRecurringTransaction)
export default router;
