import { Category } from "../Models/category.model.js";
import asyncHandler from "../Utils/asyncHandler.js";

const addCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, icon, type } = req.body;

  // Validate required fields
  if (!name || !icon || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if category already exists for the user
  const existCategory = await Category.findOne({ name, userId,type });
  if (existCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  // Create new category
  const newCategory = await Category.create({
    userId,
    name,
    icon,
    type,
  });

  return res.status(201).json({
    message: "Category created successfully",
    category: newCategory,
  });
});

export { addCategory };
