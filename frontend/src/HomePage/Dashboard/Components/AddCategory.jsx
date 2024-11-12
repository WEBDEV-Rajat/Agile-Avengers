import React, {useState} from "react";
import "../Dashboard.css"

const AddCategory = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const openCategoryPopup = () => setIsCategoryOpen(true);
    const closeCategoryPopup = () => setIsCategoryOpen(false);
  return (
    <div>
      <button
        type="button"
        onClick={openCategoryPopup}
        className="create-category-btn">
        + Create New Category
      </button>
      {isCategoryOpen && (
        <div className="popup-overlay" onClick={closeCategoryPopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Category</h2>
            <form>
              <label>
                Type
                <select>
                  <option value="">Income</option>
                  <option value="">Expense</option>
                </select>
              </label>
              <label>
                Category Name
                <input type="text" required />
              </label>
              <label>
                Icon
                <input type="text" required />
              </label>
              <button
                type="button"
                className="button2"
                onClick={closeCategoryPopup}
              >
                Close
              </button>
              <button type="submit" className="button1">
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
