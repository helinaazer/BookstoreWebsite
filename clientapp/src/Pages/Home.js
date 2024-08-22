import React from "react";
import NavBar from "../Components/NavBar";
import ItemCard from '../Components/ItemCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div>
      <NavBar />
      <Container className="container">
        <Typography variant="h4" gutterBottom className="home-title">
          Home Page
        </Typography>
        <Grid container spacing={4} className="grid-container">
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 1"
              description="This is a description of the item. It is very cool and you should buy it!"
              price="19.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 2"
              description="This is another description of the item. It's just as cool!"
              price="29.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-item">
            <ItemCard
              image="https://via.placeholder.com/345x200"
              title="Sample Item 3"
              description="This item is also pretty cool. You might want to consider buying it."
              price="39.99"
            />
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
