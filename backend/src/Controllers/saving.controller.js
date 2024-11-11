import { SavingsGoal } from "../Models/saving.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
const addGoal = asyncHandler(async (req, res) => {
  const { goalName, targetAmount, deadline } = req.body;
  const userId = req.user._id;

  if (targetAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Target amount must be greater than zero",
    });
  }
  const goal = await SavingsGoal.findOne({ userId, goalName });
  if (goal) {
    return res.status(400).json({
      success: false,
      message: "Goal with this name already exists",
    });
  }
  const newGoal = await SavingsGoal.create({
    userId,
    goalName,
    targetAmount,
    deadline,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newGoal, "Savings goal created successfully"));
});

const updateGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const { goalName, targetAmount, deadline } = req.body;
  const userId = req.user._id;
  const goal = await SavingsGoal.findOne({ userId, goalName });
  if (goal) {
    return res.status(400).json({
      success: false,
      message: "Goal with this name already exists",
    });
  }
  const updatedGoal = await SavingsGoal.findOneAndUpdate(
    { _id: goalId, userId },
    { goalName, targetAmount, deadline },
    { new: true }
  );

  if (!updatedGoal) {
    return res
      .status(404)
      .json({ success: false, message: "Savings goal not found" });
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedGoal, "Savings goal updated successfully")
    );
});

const getallGoals = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const goals = await SavingsGoal.find({ userId });

  res
    .status(200)
    .json(new ApiResponse(200, goals, "Savings goals retrieved successfully"));
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user._id;

  const deletedGoal = await SavingsGoal.findOneAndDelete({
    _id: goalId,
    userId,
  });
  if (!deletedGoal) {
    return res.status(404).json({
      success: false,
      message: "Savings goal not found",
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Savings goal deleted successfully"));
});

const addContribution = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userId = req.user._id;
  const { goalId } = req.params;
  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Contribution amount must be greater than zero",
    });
  }

  const goal = await SavingsGoal.findOne({ _id: goalId, userId });
  if (!goal) {
    return res.status(404).json({
      success: false,
      message: "Savings goal not found",
    });
  }

  goal.currentAmount += amount;
  await goal.save();

  res
    .status(200)
    .json(new ApiResponse(200, goal, "Contribution added successfully"));
});

const trackGoalProgress = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user._id;

  const goal = await SavingsGoal.findOne({ _id: goalId, userId });
  if (!goal) {
    return res.status(404).json({
      success: false,
      message: "Savings goal not found",
    });
  }

  const progress = {
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    remainingAmount: goal.targetAmount - goal.currentAmount,
  };

  res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress tracked successfully"));
});

// abhi implement nahi huaa hai
const sendDeadlineReminder = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user._id;

  const goal = await SavingsGoal.findOne({ _id: goalId, userId });
  if (!goal) {
    return res
      .status(404)
      .json({ success: false, message: "Savings goal not found" });
  }

  const reminderDate = new Date(goal.deadline);
  reminderDate.setDate(reminderDate.getDate() - 7);

  const today = new Date();
  if (today >= reminderDate) {
    res
      .status(200)
      .json(new ApiResponse(200, null, "Reminder sent successfully"));
  } else {
    res.status(400).json({ success: false, message: "No reminder needed yet" });
  }
});
// abhi implement nahi huaa hai
const checkGoalCompletion = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const userId = req.user._id;

  const goal = await SavingsGoal.findOne({ _id: goalId, userId });
  if (!goal) {
    return res.status(404).json({
      success: false,
      message: "Savings goal not found",
    });
  }

  const goalCompleted = goal.currentAmount >= goal.targetAmount;

  res
    .status(200)
    .json(new ApiResponse(200, { goalCompleted }, "Goal completion checked"));
});

const allProgress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const goals = await SavingsGoal.find({ userId });

  const goalProgress = goals.map((goal) => ({
    goalName: goal.goalName,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    progressPercentage: (goal.currentAmount / goal.targetAmount) * 100,
  }));

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        goalProgress,
        "All goals with progress fetched successfully"
      )
    );
});

// for pdf and other documents

const getReciept = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const goals = await SavingsGoal.find({ userId });

  const { fileType } = req.query;

  if (fileType === "csv") {
    const parser = new Parser();
    const csv = parser.parse(goals);

    res.header("Content-Type", "text/csv");
    res.attachment("savings_goals.csv");
    return res.send(csv);
  }

  if (fileType === "pdf") {
    const doc = new PDFDocument();

    res.header("Content-Type", "application/pdf");
    res.attachment("savings_goals.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Savings Goals", { align: "center" });

    doc.fontSize(12);
    doc.text("Goal Name      Target Amount      Deadline", { align: "left" });

    goals.forEach((goal) => {
      doc.text(
        `${goal.goalName}      ${goal.targetAmount}      ${goal.deadline ? goal.deadline.toISOString().split("T")[0] : "N/A"}`,
        { align: "left" }
      );
    });

    doc.end();
    return;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goals, "Goals fetched successfully"));
});

export {
  addGoal,
  updateGoal,
  getallGoals,
  deleteGoal,
  addContribution,
  trackGoalProgress,
  allProgress,
  getReciept,
};
