import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./ItemCard.css"; // Import the CSS file
import { Link } from "react-router-dom";

const ItemCard = ({ image, title, description, price, link }) => {
  return (
    <Link to={link} className="item-card-link">
      <Card classes={{ root: 'custom-card' }} className="item-card">
        <div
          className="image-container"
          style={{ backgroundImage: `url(${image})` }}
        >
          <CardContent className="overlay-content">
            <Typography variant="h5" component="div" className="card-title">
              {title}
            </Typography>
            <Typography variant="body2" className="card-description">
              {description}
            </Typography>
            <Typography variant="h6" className="card-price">
              {price}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default ItemCard;
