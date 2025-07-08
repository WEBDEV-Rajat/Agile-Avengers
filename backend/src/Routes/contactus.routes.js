import { Router } from "express";
import { submitContactForm } from "../Controllers/contactus.controller.js";

const router = Router();

router.post("/us", submitContactForm);

export default router;
