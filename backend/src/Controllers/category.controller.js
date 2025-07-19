import { Category } from "../Models/category.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite : "none"
};

const addCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, icon, type } = req.body;

  if (!name || !icon || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existCategory = await Category.findOne({ name, userId, type });
  if (existCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const newCategory = await Category.create({
    userId,
    name,
    icon,
    type,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newCategory, "Category created successfully"));
});

const deletecategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const existCategory = await Category.findOne({ _id: id, userId });
  if(!existCategory){
    return res.status(404).json({
      success:false,
      message:"category not found"
    })
  }
  const category = await Category.findByIdAndDelete({ _id: id, userId });
  return res.status(200).json(new ApiResponse(200, 
    category, "Category deleted successfully"
  ));
});

const getAllincomeCategory = asyncHandler(async (req,res) => {
  const userId = req.user._id;
  const type = "income"
  const data = await Category.find({userId,type})
  return res.status(200).json(
    new ApiResponse(200, data, "Category fetched successfully")
  )
})

const getAllexpenseCategory = asyncHandler(async (req,res) => {
  const userId = req.user._id;
  const type = "expense"
  const data = await Category.find({userId,type})
  return res.status(200).json(
    new ApiResponse(200, data, "Category fetched successfully")
  )
})

export { addCategory,deletecategory ,getAllincomeCategory,getAllexpenseCategory}
