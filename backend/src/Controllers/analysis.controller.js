import { Transaction } from "../Models/transaction.model.js";
import asyncHandler from "../Utils/asyncHandler.js";

const createDateFilter = (fromDate, toDate) => {
  if (fromDate && toDate) {
    return { date: { $gte: new Date(fromDate), $lte: new Date(toDate) } };
  }
  return {};
};

const getAmountSpendPerCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.body;

  const match = {
    userId,
    type: "expense",
    ...createDateFilter(fromDate, toDate),
  };

  const result = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
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
    { $sort: { totalAmount: -1 } },
  ]);

  const categoryMap = {};
  result.forEach(item => {
    categoryMap[item.category] = item.totalAmount;
  });

  res.json({ success: true, data: categoryMap });
});

const getAmountIncomePerCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.body;

  const match = {
    userId,
    type: "income",
    ...createDateFilter(fromDate, toDate),
  };

  const result = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
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
    { $sort: { totalAmount: -1 } },
  ]);

  const categoryMap = {};
  result.forEach(item => {
    categoryMap[item.category] = item.totalAmount;
  });

  res.json({ success: true, data: categoryMap });
});

const getFinancialOverview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.body;

  const dateFilter = createDateFilter(fromDate, toDate);

  const [incomeAgg, expenseAgg] = await Promise.all([
    Transaction.aggregate([
      { $match: { userId, type: "income", ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Transaction.aggregate([
      { $match: { userId, type: "expense", ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  const income = incomeAgg[0]?.total || 0;
  const expense = expenseAgg[0]?.total || 0;

  res.json({ income, expense, balance: income - expense });
});

const getTransactionTrend = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate, type } = req.query;

  const match = {
    userId,
    ...createDateFilter(fromDate, toDate),
  };

  if (type && type !== "all" && ["income", "expense"].includes(type)) {
    match.type = type;
  } else if (type === "all") {
    // No need to filter by type; include both income and expense
  }

  const trend = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        date: "$_id.date",
        type: "$_id.type",
        total: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);

  res.status(200).json({ trend });
});

const getTopTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { type = "all", fromDate, toDate, limit = 5 } = req.query;
  // console.log("hello");
  
  const match = {
    userId,
    ...createDateFilter(fromDate, toDate),
  };

  if (type && type !== "all" && ["income", "expense"].includes(type)) {
    match.type = type;
  } else if (type === "all") {
  }

  const limitValue = isNaN(Number(limit)) ? 5 : Number(limit);

  const transactions = await Transaction.find(match)
    .sort({ amount: -1 })
    .limit(limitValue)
    .populate("category")

  res.json({ transactions });
});

const getMostUsedCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.query;

  const match = {
    userId,
    ...createDateFilter(fromDate, toDate),
  };

  const result = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$category", count: { $sum: 1 } } },
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

  res.json({ category: result[0]?.categoryDetails.name || "N/A" });
});

const getSavingsRate = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.query;

  const dateFilter = createDateFilter(fromDate, toDate);

  const [incomeAgg, expenseAgg] = await Promise.all([
    Transaction.aggregate([
      { $match: { userId, type: "income", ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    Transaction.aggregate([
      { $match: { userId, type: "expense", ...dateFilter } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  const income = incomeAgg[0]?.total || 0;
  const expense = expenseAgg[0]?.total || 0;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  res.json({ savingsRate: savingsRate.toFixed(2) });
});

export {
  getAmountSpendPerCategory,
  getAmountIncomePerCategory,
  getFinancialOverview,
  getTransactionTrend,
  getTopTransactions,
  getMostUsedCategory,
  getSavingsRate,
};