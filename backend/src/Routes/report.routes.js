import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
import { downloadReport } from "../Controllers/report.controller.js";

const router = Router();

router.route("/report/download").get(verifyJWT, downloadReport);

