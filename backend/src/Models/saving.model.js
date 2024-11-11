import mongoose from "mongoose";
const SavingsGoalSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    goalName: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const SavingsGoal = mongoose.model('SavingsGoal', SavingsGoalSchema);
  