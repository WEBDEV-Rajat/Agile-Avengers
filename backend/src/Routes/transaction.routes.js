import { Router } from "express";
import { addTransaction } from "../Controllers/Transaction.controller.js";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
const router = Router();

router.route("/add-transaction").post(verifyJWT,addTransaction)

export default router