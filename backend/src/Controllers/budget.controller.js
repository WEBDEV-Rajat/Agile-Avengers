import { Budget } from "../Models/budget.model.js";
import { Transaction } from "../Models/transaction.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Category } from "../Models/category.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const createBudget = asyncHandler(async (req, res) => {
  const { category, limit, period } = req.body;
  const userId = req.user._id;
  const categoryId = await Category.findOne({userId, name: category});
  if(!categoryId){
    return res.status(404).json({
        success: false,
        message: "Category not found, please make sure you have a valid category",
    })
  }
  const existingBudget = await Budget.findOne({ userId, categoryId, period });
  if (existingBudget) {
    throw new ApiError(400, "Budget for this category and period already exists");
  }

  const budget = await Budget.create({ userId, categoryId, limit, period });
  return res.status(200).json(
    new ApiResponse(200, budget, "Budget created successfully")
  )
  
});

const getBudgets = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const budgets = await Budget.find({ userId }).populate("categoryId", "name icon type");
  res.status(200).json({ budgets });
});

const updateBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;
  const { limit, period } = req.body;
  const userId = req.user._id;

  const updatedBudget = await Budget.findOneAndUpdate(
    { _id: budgetId, userId },
    { limit, period },
    { new: true }
  );

  if (!updatedBudget) throw new ApiError(404, "Budget not found");
  res.status(200).json({ message: "Budget updated successfully", updatedBudget });
});

const deleteBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;
  const userId = req.user._id;

  const deletedBudget = await Budget.findOneAndDelete({ _id: budgetId, userId });
  if (!deletedBudget) throw new ApiError(404, "Budget not found");

  res.status(200).json({ message: "Budget deleted successfully" });
});

const checkBudgetUsage = asyncHandler(async (req, res) => {
  const { categoryId, period } = req.query;
  const userId = req.user._id;

  const budget = await Budget.findOne({ userId, categoryId, period });
  if (!budget) throw new ApiError(404, "Budget not found");

  const totalSpent = await Transaction.aggregate([
    { $match: { userId, categoryId, type: "expense", period } },
    { $group: { _id: "$categoryId", totalAmount: { $sum: "$amount" } } }
  ]);

  const remainingBudget = budget.limit - (totalSpent[0]?.totalAmount || 0);

  res.status(200).json({
    budget,
    totalSpent: totalSpent[0]?.totalAmount || 0,
    remainingBudget
  });
});

export { createBudget, getBudgets, updateBudget, deleteBudget, checkBudgetUsage };
