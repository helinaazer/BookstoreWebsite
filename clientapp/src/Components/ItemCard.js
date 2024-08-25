import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button from Material-UI
import './ItemCard.css'; // Import the CSS file

const ItemCard = ({ image, title, description, price }) => {
  return (
    <Card class="item-card">
      <div className="image-container" style={{ backgroundImage: `url(${image})` }}>
        <CardContent className="overlay-content">
          <Typography variant="h5" component="div" className="card-title">
            {title}
          </Typography>
          <Typography variant="body2" className="card-description">
            {description}
          </Typography>
          <Typography variant="h6" className="card-price">
            ${price}
          </Typography>
          <Button variant="contained" style={{ backgroundColor: '#e7decb', color: 'black' }} className="card-button">
            Buy Now
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default ItemCard;
