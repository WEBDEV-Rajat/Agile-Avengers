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

  const categoryData = await Category.findOne({ name: category, userId, type });
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
const editTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { amount, date, category, type, note } = req.body;

  const transaction = await Transaction.findOne({ _id: id, userId });
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  if (amount) transaction.amount = amount;
  if (date) transaction.date = date;
  if (category) {
    const categoryData = await Category.findOne({
      name: category,
      userId,
      type,
    });
    if (!categoryData) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    transaction.category = categoryData._id;
  }
  if (type) {
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either 'income' or 'expense'",
      });
    }
    transaction.type = type;
  }
  if (note) transaction.note = note;

  await transaction.save();
  res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction updated successfully")
    );
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const existTransaction = await Transaction.findOne({ _id: id, userId });
  if (!existTransaction) {
    return res.status(404).json({
      success: false,
      message: "transaction not found",
    });
  }
  const transaction = await Transaction.findByIdAndDelete({ _id: id, userId });
  console.log("sd,n.f", transaction);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Transaction deleted successfully"));
});

const getallTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User ID is required"));
  }

  const transactions = await Transaction.find({ userId }).sort({
    date: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transactions,
        "All transactions retrieved successfully"
      )
    );
});

const getallExporInc = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User ID is required"));
  }

  const transactions = await Transaction.find({ userId, type }).sort({
    date: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transactions,
        "All transactions retrieved successfully"
      )
    );
});

const getallTransactionsofaCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { category } = req.body;
  const cat = await Category.findOne({ userId, name: category });
  if (!cat) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, `Category '${category}' not found`));
  }
  const transactions = await Transaction.find({ category: cat._id }).sort({
    date: -1,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transactions,
        `all transactions of ${category} fetched successfully`
      )
    );
});

const transactionDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const transaction = await Transaction.findOne({userId ,_id: id });
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transaction,
        "Transaction details retrieved successfully"
      )
    );
});



export {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getallTransactions,
  getallExporInc,
  getallTransactionsofaCategory,
  transactionDetails
};
