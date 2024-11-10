import { Router } from "express";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
} from "../Controllers/Transaction.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
const router = Router();

router.route("/add-transaction").post(verifyJWT, addTransaction);
router.route("/edit-transaction/:id").post(verifyJWT, editTransaction);
router.route("/delete-transaction/:id").delete(verifyJWT, deleteTransaction);
export default router;
