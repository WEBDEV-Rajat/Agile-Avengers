import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String, 
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },
  });
  
export const Category = mongoose.model('Category', CategorySchema);
  