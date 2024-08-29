import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ variant, onClick, text }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: "#e0d8b4",
        color: "rgb(54, 49, 39)",
        "&:hover": {
          backgroundColor: "#9f8a71",
          color: "#333",
        },
        padding: "10px",
        borderRadius: "4px",
        transition: "all 0.3s ease",
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
