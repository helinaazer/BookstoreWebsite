import React from "react";
import "./Category.css";

const Category = ({ categories }) => {
  const itemsPerRow = 4;
  const isLastRowFull = categories.length % itemsPerRow === 0;

  return (
    <div
      className={`categories-container ${
        !isLastRowFull ? "center-last-row" : ""
      }`}
    >
      {categories.map((category, index) => (
        <a href={category.link} className="category-link" key={index}>
          <div className="category-image-container">
            <img src={category.image} alt={category.title} />
          </div>
          <div className="category-title">{category.title}</div>
        </a>
      ))}
    </div>
  );
};

export default Category;
