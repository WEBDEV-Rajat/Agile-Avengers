import { Router } from "express";
import { verifyJWT } from "../Middlewares/verifyJwt.middleware.js";
import { addContribution, addGoal, allProgress, deleteGoal, getallGoals, getReciept, trackGoalProgress, updateGoal } from "../Controllers/saving.controller.js";
const router = Router();
router.route("/add-goal").post(verifyJWT, addGoal)
router.route("/update-goal/:goalId").post(verifyJWT,updateGoal);
router.route("/get-all").get(verifyJWT,getallGoals)
router.route("/delete-goal/:goalId").delete(verifyJWT,deleteGoal);
router.route("/add-contribution/:goalId").post(verifyJWT,addContribution);
router.route("/track-goal/:goalId").get(verifyJWT,trackGoalProgress)
router.route("/all-progress").get(verifyJWT,allProgress)
router.route("/get-receipt").get(verifyJWT, getReciept);

export default router

