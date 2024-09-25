import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import "./ItemCard.css";

export default function ItemCard({
  id, // Receiving id as prop
  title,
  price,
  image,
  quantity,
  isRequestable,
}) {
  const navigate = useNavigate();

  const outOfStock = quantity === 0 && !isRequestable;
  const requestable = quantity === 0 && isRequestable;

  const handleCardClick = () => {
    if (!outOfStock) {
      navigate(`/productinfo/${id}`); // Navigate using id
    }
  };

  return (
    <Card
      className={`card-hover ${outOfStock ? "out-of-stock" : ""}`}
      sx={{ maxWidth: { xs: 300, sm: 345, md: 400 } }}
    >
      <CardActionArea
        onClick={handleCardClick}
        disabled={outOfStock} // Disable interaction if out of stock
        sx={{ cursor: outOfStock ? "not-allowed" : "pointer" }}
      >
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "contain" }}
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
                md: "1.5rem",
                lg: "1.75rem",
              },
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
              color: "text.secondary",
            }}
          >
            {price}
          </Typography>

          {!outOfStock && !requestable && (
            <Typography
              sx={{ color: "transparent", fontSize: "0.8rem", mt: 0.5 }}
            >
              H
            </Typography>
          )}

          {outOfStock && (
            <Typography sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>
              Out of Stock
            </Typography>
          )}
          {requestable && (
            <Typography sx={{ color: "green", fontSize: "0.8rem", mt: 0.5 }}>
              Requestable
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
