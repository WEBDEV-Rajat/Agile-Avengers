import React, { useState } from "react";
import "../Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = ({ type ,onCategoryAdded}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const openCategoryPopup = () => setIsCategoryOpen(true);
  const closeCategoryPopup = () => setIsCategoryOpen(false);
  // console.log("ashfdsguidgdsuifguidsguicgdiuf");
  
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      // console.log("sahfkdu vufdsyufi udsuf");
      
      const form = { name, icon, type }; 
      const url = 'http://localhost:5000/api/v1/category/add-category';
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      // console.log("dsgfshgfhjk",response.data); 
      closeCategoryPopup(); 
      toast.success(response.data.message);
      if(onCategoryAdded){
        onCategoryAdded();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response.data.message);
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
                <input
                  type="text"
                  value={type}
                  readOnly
                  className="type-input"
                />
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
              <button
                type="button"
                className="button2"
                onClick={closeCategoryPopup}
              >
                Close
              </button>
              <button type="submit" className="button1" onClick={addCategory}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;