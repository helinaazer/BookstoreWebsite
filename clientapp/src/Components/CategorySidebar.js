import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";

const StyledList = styled(List)({
  width: "100%",
  maxWidth: 360,
  backgroundColor: "#ffffff", // Directly using a color value
});

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5", // Directly using a color value for hover
  },
  ...(isActive && {
    backgroundColor: "#ececec", // Directly using a color value for active items
  }),
}));

const categories = [
  "All Items",
  "Convent Wood Work & Engraving",
  "Convent Food Products",
  "Convent Handmade",
  "Convent Embroidery",
  "Accessories & Jewelry",
  "Apparel",
  "Bags",
  "Books",
  "Children",
  "Church Supplies",
  "Crosses",
  "Drinkware",
  "Head Veils",
  "Illumination",
  "Miscellaneous",
  "Personalization",
];

const CategorySidebar = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Implement your logic to display products based on the selected category
  };

  return (
    <StyledList component="nav">
      {categories.map((category, index) => (
        <StyledListItem
          key={index}
          isActive={category === activeCategory}
          onClick={() => handleCategoryClick(category)}
        >
          <ListItemText primary={category} />
        </StyledListItem>
      ))}
    </StyledList>
  );
};

export default CategorySidebar;
