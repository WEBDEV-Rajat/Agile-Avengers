import asyncHandler from "../Utils/asyncHandler.js";
import { Transaction } from "../Models/transaction.model.js";
import { Parser } from "json2csv";

const options = {
  httpOnly: true,
  secure: true,
  sameSite : "none"
};

export const downloadReport = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fromDate, toDate } = req.query;

  const match = { userId };
  if (fromDate && toDate) {
    match.date = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(match).populate("category", "name");

  const reportData = transactions.map((tx) => ({
    Date: tx.date.toISOString().split("T")[0],
    Amount: tx.amount,
    Type: tx.type,
    Category: tx.category?.name || "N/A",
    Description: tx.description || "",
  }));

  const parser = new Parser();
  const csv = parser.parse(reportData);

  res.header("Content-Type", "text/csv");
  res.attachment("expense-report.csv");
  res.send(csv);
});
