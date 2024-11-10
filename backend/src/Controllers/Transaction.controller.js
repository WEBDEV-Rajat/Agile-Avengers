import { Transaction } from "../Models/transaction.model.js";
import { Category } from "../Models/category.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

const addTransaction = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { amount, date, category, type, note } = req.body;


  if (!amount || !category || !type) {
    return res.status(400).json({
      success: false,
      message: "Amount, category, and type are required",
    });
  }

  
  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({
      success: false,
      message: "Type must be either 'income' or 'expense'",
    });
  }

 
  const categoryData = await Category.findOne({ name: category, userId,type});
  if (!categoryData) {
    return res.status(400).json({
      success: false,
      message: "Category not found",
    });
  }

  
  const newTransaction = await Transaction.create({
    amount,
    date,
    category: categoryData._id, 
    type,
    note,
    userId,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, newTransaction, "Transaction added successfully")
    );
});

export { addTransaction };
