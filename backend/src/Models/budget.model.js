const BudgetSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const Budget = mongoose.model('Budget', BudgetSchema);
  