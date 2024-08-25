import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ItemCardBig.css';

const ItemCardBig = ({ image, title, description, price, quantity, onRemove, onSaveForLater }) => {
  return (
    <Card className="item-card-big">
      <div className="item-card-container">
        <div className="item-image">
          <img src={image} alt={title} />
        </div>
        <div className="item-details">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Only 8 left in stock - order soon.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Shipped from: Deal Box Center
          </Typography>
          <Typography variant="body2" color="textSecondary">
            FREE delivery Aug 29 - Sep 3
          </Typography>
          <div className="item-actions">
            <label htmlFor="quantity">Qty:</label>
            <select name="quantity" id="quantity" value={quantity}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
            <Button variant="text" onClick={onRemove}>
              Delete
            </Button>
            <Button variant="text" onClick={onSaveForLater}>
              Save for later
            </Button>
          </div>
        </div>
        <div className="item-price">
          <Typography variant="h6" component="div">
            ${price}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default ItemCardBig;
