import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../Components/ProductDetails";
import NavBar from "../Components/NavBar";

const products = {
  1: {
    name: "Sample Product 1",
    description: "This is a sample product description for product 1.",
    price: 99.99,
    image: "https://via.placeholder.com/400",
  },
  2: {
    name: "Sample Product 2",
    description: "This is a sample product description for product 2.",
    price: 29.99,
    image: "/logo192.png",
  },
  3: {
    name: "Sample Product 3",
    description: "This is a sample product description for product 3.",
    price: 39.99,
    image: "https://via.placeholder.com/345x200",
  },
  4: {
    name: "Sample Product 4",
    description: "This is a sample product description for product 4.",
    price: 49.99,
    image: "https://via.placeholder.com/345x200",
  },
};

const Product = () => {
  const { id } = useParams();

  // Fetch or define your product data based on the ID
  const product = products[id];

  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log(`Product ${id} added to cart`);
  };

  return (
    <div>
      <NavBar />
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Product;
