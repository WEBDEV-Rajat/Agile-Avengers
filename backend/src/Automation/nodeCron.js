import { RecurringTransaction } from "../Models/reoccuringtransaction.model.js";
import cron from "node-cron";
import { sendEmail } from "../Utils/sendEmail.js";

export const runRecurringTransactions = async () => {
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    const upcomingDate = new Date();
    upcomingDate.setDate(today.getDate() + 2);

    try {
      const transactions = await RecurringTransaction.find({
        nextDueDate: { $lte: upcomingDate },
        active: true,
      }).populate("userId");

      const userTransactionsMap = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.userId._id]) {
          acc[transaction.userId._id] = {
            email: transaction.userId.email,
            transactions: [],
          };
        }
        acc[transaction.userId._id].transactions.push(transaction);
        return acc;
      }, {});

      for (const userId in userTransactionsMap) {
        const { email, transactions } = userTransactionsMap[userId];
        const transactionList = transactions
          .map(
            (t) =>
              `- ${t.note || "Transaction"}: ₹${t.amount} on ${t.nextDueDate.toDateString()}`
          )
          .join("<br>");

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f7fafc;">
            <h3 style="font-size: 1.5rem; color: #2d3748; font-weight: bold; margin-bottom: 10px; text-align: center;">📅 Upcoming Transactions Reminder</h3>
            <p style="font-size: 1rem; color: #4a5568; margin-bottom: 20px; text-align: center;">You have the following transactions due within the next two days:</p>
            <div style="background-color: #edf2f7; padding: 15px; border-radius: 8px; color: #2d3748;">
              ${transactionList}
            </div>
            <p style="font-size: 0.875rem; color: #718096; margin-top: 20px; text-align: center;">Please make sure to manage your budget accordingly.</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="https://expenseguru-black.vercel.app/" style="display: inline-block; font-size: 1rem; color: #fff; background-color: #4299e1; padding: 10px 20px; border-radius: 5px; text-decoration: none;">View All Transactions</a>
            </p>
          </div>
        `;

        await sendEmail({
          email,
          subject: "Upcoming Transactions Due Soon",
          htmlContent,
        });

        for (const transaction of transactions) {
          transaction.nextDueDate = getNextDueDate(
            transaction.nextDueDate,
            transaction.frequency
          );
          await transaction.save();
        }
      }

      console.log(
        "Recurring transactions checked, reminders sent, and due dates updated."
      );
    } catch (error) {
      console.error("Error running recurring transactions check:", error);
    }
  });
};

const getNextDueDate = (currentDueDate, frequency) => {
  const nextDueDate = new Date(currentDueDate);

  switch (frequency) {
    case "daily":
      nextDueDate.setDate(nextDueDate.getDate() + 1);
      break;
    case "weekly":
      nextDueDate.setDate(nextDueDate.getDate() + 7);
      break;
    case "monthly":
      nextDueDate.setMonth(nextDueDate.getMonth() + 1);
      break;
    case "yearly":
      nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
      break;
    default:
      throw new Error("Invalid frequency");
  }

  return nextDueDate;
};
