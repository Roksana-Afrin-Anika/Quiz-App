// CategorySelector.js
import React from "react";
import "./CategorySelector.css";

const CategorySelector = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="category-container">
      <div className="category-content">
        <h2>Select a Category</h2>
        <select
          onChange={(e) => onCategoryChange(e.target.value)}
          value={selectedCategory}
          className="category-select"
        >
          <option value="">--Select a Category--</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="category-option"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySelector;
