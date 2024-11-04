const RecurringTransactionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: true,
    },
    nextDueDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  });
  
  module.exports = mongoose.model('RecurringTransaction', RecurringTransactionSchema);
  