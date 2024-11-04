const ReportSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportType: {
      type: String,
      enum: ['summary', 'detailed'],
      required: true,
    },
    dateRange: {
      from: Date,
      to: Date,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    downloadLink: {
      type: String, // Link to PDF or Excel file
    },
  });
  
  module.exports = mongoose.model('Report', ReportSchema);
  