import { Category } from "../Models/category.model.js";
import { RecurringTransaction } from "../Models/reoccuringtransaction.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

const addTransaction = asyncHandler(async (req, res) => {
  const { amount, category, frequency, nextDueDate, note } = req.body;
  const userId = req.user._id;
  console.log("amount: " + amount);
  console.log("category: " + category);
  console.log("frequency: " + frequency);
  console.log("nextDueDate: " + nextDueDate);
  console.log("note: " + note);
  
  if (!amount || !category || !frequency || !nextDueDate || !note) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Missing required fields"));
  }

  const categoryDoc = await Category.findOne({
    name: category,
    userId,
    type: "expense",
  });
  if (!categoryDoc) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid category"));
  }

  const recurringTransaction = new RecurringTransaction({
    userId,
    amount,
    categoryId: categoryDoc._id,
    frequency,
    nextDueDate,
    note,
  });

  await recurringTransaction.save();
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        recurringTransaction,
        "Recurring transaction added successfully"
      )
    );
});

const getallRecurringTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const recurringTransactions = await RecurringTransaction.find({
    userId,
  }).populate("categoryId", "type name icon"); 
  return res
    .status(200)
    .json(
      new ApiResponse(200, recurringTransactions, "All recurring transactions")
    );
});

const updateRecurringTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const updates = req.body;

  const updatedTransaction = await RecurringTransaction.findOneAndUpdate(
    { _id: transactionId, userId: req.user._id },
    updates,
    { new: true }
  );

  if (!updatedTransaction) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Transaction not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTransaction,
        "Recurring transaction updated successfully"
      )
    );
});

const ChangeStatusRecurringTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const transaction = await RecurringTransaction.findOne({
    _id: transactionId,
    userId: req.user._id,
  });
  if (!transaction) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Transaction not found"));
  }

  transaction.active = !transaction.active;
  await transaction.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transaction,
        `Recurring transaction ${transaction.active ? "activated" : "deactivated"} successfully`
      )
    );
});

const deleteRecurringTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const deletedTransaction = await RecurringTransaction.findOneAndDelete({
    _id: transactionId,
    userId: req.user._id,
  });

  if (!deletedTransaction) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Transaction not found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, null, "Recurring transaction deleted successfully")
    );
});

const getUpcomingTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { days } = req.body
  const upcomingDate = new Date();
  upcomingDate.setDate(upcomingDate.getDate() + parseInt(days, 10));

  const upcomingTransactions = await RecurringTransaction.find({
    userId,
    nextDueDate: { $lte: upcomingDate },
    active: true,
  }).sort({ nextDueDate: 1 }).populate("categoryId", "type name icon");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        upcomingTransactions,
        "Upcoming recurring transactions fetched successfully"
      )
    );
});

const getdetails = asyncHandler(async(req,res)=>{
  const userId = req.user._id
  const { id } = req.params
  const transaction = await RecurringTransaction.findOne({
    _id: id,
    userId: userId,
  })
  if(!transaction){
    return res.status(404).json(new ApiResponse(404, null, "Transaction not found"))
  }
  res.status(200).json(new ApiResponse(200, transaction, "Transaction details fetched successfully"))
})

export {
  addTransaction,
  getallRecurringTransactions,
  updateRecurringTransaction,
  ChangeStatusRecurringTransaction,
  getUpcomingTransactions,
  deleteRecurringTransaction,
  getdetails
};
