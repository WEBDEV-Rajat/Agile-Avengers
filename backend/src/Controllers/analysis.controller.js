import { Transaction } from "../Models/transaction.model.js";
import asyncHandler from "../Utils/asyncHandler.js";

const getAmountSpendPerCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.body;

  const match = {
    userId,
    type: "expense",
  };

  if (fromDate && toDate) {
    match.date = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const result = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $match: {
        totalAmount: { $gt: 0 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $project: {
        category: "$categoryDetails.name",
        totalAmount: 1,
      },
    },
    {
      $sort: { totalAmount: 1 },
    },
  ]);

  const categoryMap = {};
  result.forEach((item) => {
    categoryMap[item.category] = item.totalAmount;
  });

  res.status(200).json({
    success: true,
    data: categoryMap,
  });
});

const getAmountIncomePerCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.body;

  const match = {
    userId,
    type: "income",
  };

  if (fromDate && toDate) {
    match.date = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const result = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $match: {
        totalAmount: { $gt: 0 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
    {
      $project: {
        category: "$categoryDetails.name",
        totalAmount: 1,
      },
    },
    {
      $sort: { totalAmount: 1 },
    },
  ]);

  const categoryMap = {};
  result.forEach((item) => {
    categoryMap[item.category] = item.totalAmount;
  });

  res.status(200).json({
    success: true,
    data: categoryMap,
  });
});

const getFinancialOverview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(req.body);
  
  const { fromDate, toDate } = req.query;
  // console.log(fromDate);
  // console.log(toDate);

  const dateFilter =
    fromDate && toDate
      ? { date: { $gte: new Date(fromDate), $lte: new Date(toDate) } }
      : {};

  const matchIncome = { userId, type: "income", ...dateFilter };
  const matchExpense = { userId, type: "expense", ...dateFilter };

  const [incomeAgg, expenseAgg] = await Promise.all([
    Transaction.aggregate([
      { $match: matchIncome },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Transaction.aggregate([
      { $match: matchExpense },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  const income = incomeAgg[0]?.total || 0;
  const expense = expenseAgg[0]?.total || 0;

  res.json({ income, expense, balance: income - expense });
});

const getTransactionTrend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type = "all" } = req.query;
  const match = { userId };
  if (type !== "all") match.type = type;

  const trend = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({ trend });
});

const getTopTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type = "all", fromDate, toDate, limit = 5 } = req.query;

  const match = { userId };
  if (type !== "all") {
    match.type = type;
  }
  if (fromDate && toDate) {
    match.date = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(match)
    .sort({ amount: -1 }) 
    .limit(Number(limit));

  res.json({ transactions });
});


const getMostUsedCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const result = await Transaction.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $unwind: "$categoryDetails" },
  ]);
console.log(result);

  res.json({ category: result[0]?.categoryDetails.name || "N/A" });
});

const getSavingsRate = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [incomeAgg, expenseAgg] = await Promise.all([
    Transaction.aggregate([
      { $match: { userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Transaction.aggregate([
      { $match: { userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  const income = incomeAgg[0]?.total || 0;
  const expense = expenseAgg[0]?.total || 0;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  res.json({ savingsRate: savingsRate.toFixed(2) });
});

export {
  getFinancialOverview,
  getTransactionTrend,
  getTopTransactions,
  getMostUsedCategory,
  getSavingsRate,
  getAmountSpendPerCategory,
  getAmountIncomePerCategory,
};
