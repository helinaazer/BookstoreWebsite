import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { UserProvider } from "../Components/UserAdminContext";
import { Button, Alert, Container, Row, Col, Carousel } from "react-bootstrap";
import "./ProductInfo.css"; // Import the CSS for the animation
import NavBar from "../Components/NavBar";

// Example product data
const products = [
  {
    id: 1,
    title: "Product 1",
    description: "This is a description for product 1.",
    price: 99.99,
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400/0000FF",
      "https://via.placeholder.com/400/FF0000",
    ],
    quantity: 0,
    isRequestable: true,
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is a description for product 2.",
    price: 29.99,
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400/0000FF",
      "https://via.placeholder.com/400/FF0000",
    ],
    quantity: 10,
    isRequestable: false,
  },
  // Add more products as needed
];

const ProductInfo = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)); // Fetch the product by its ID

  const [isAdded, setIsAdded] = useState(false); // State to trigger the animation

  const handleAddToCart = () => {
    setIsAdded(true); // Trigger the animation
    console.log(`Product ${id} added to cart`);

    // Reset the animation after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (!product) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Product not found.</Alert>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>

      <Container className="mt-4">
        <Row>
          <Col md={6}>
            {/* Carousel with manual navigation */}
            <Carousel controls={true} indicators={false}>
              {product.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h4 className="text-primary">${product.price}</h4>

            {/* Display stock and requestable info */}
            {product.quantity > 0 || product.isRequestable ? (
              <>
                {product.quantity === 0 && product.isRequestable && (
                  <Alert variant="warning">
                    This item is being restocked and may take longer to deliver.
                  </Alert>
                )}
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </>
            ) : (
              <Alert variant="danger">Out of Stock</Alert>
            )}

            {/* Animation for "Item added to cart" */}
            {isAdded && (
              <div className="cart-animation">Item added to cart!</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductInfo;
