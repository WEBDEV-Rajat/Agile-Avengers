import React, { useState } from "react";
import "../Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = ({ type, onCategoryAdded }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const openCategoryPopup = () => setIsCategoryOpen(true);
  const closeCategoryPopup = () => setIsCategoryOpen(false);

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const form = { name, icon, type };
      const response = await axios.post("http://localhost:5000/api/v1/category/add-category", form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      closeCategoryPopup();
      if (onCategoryAdded) onCategoryAdded();
    } catch (err) {
      console.error("Error adding category:", err);
      toast.error(err?.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={openCategoryPopup}
        className="create-category-btn"
      >
        + Create New Category
      </button>

      {isCategoryOpen && (
        <div className="popup-overlay" onClick={closeCategoryPopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Category</h2>
            <form onSubmit={addCategory}>
              <label>
                Type
                <input type="text" value={type} readOnly className="type-input" />
              </label>
              <label>
                Category Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Icon
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  required
                />
              </label>
              <div className="popup-buttons">
                <button type="button" className="button2" onClick={closeCategoryPopup}>
                  Close
                </button>
                <button type="submit" className="button1">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
