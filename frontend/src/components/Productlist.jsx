import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import './Productlist.css'; // Custom CSS
import { useNavigate } from 'react-router-dom';

// Images
import blackDenimJacket from "../assets/blackDenimjacket.png";
import classicWhitetshirt from "../assets/tshirt.png";
import goldHoodie from "../assets/hoodie.png";
import casualJoggers from "../assets/joggers.png";

// Dummy product data
const dummyProducts = [
  {
    id: 5,
    name: 'ANHA Black Denim Jacket',
    image: blackDenimJacket,
    price: 2199,
    brand: 'ANHA',
    rating: 4.5
  },
  {
    id: 6,
    name: 'ANHA Classic White Tee',
    image: classicWhitetshirt,
    price: 799,
    brand: 'ANHA',
    rating: 4.2
  },
  {
    id: 7,
    name: 'ANHA Gold Hoodie',
    image: goldHoodie,
    price: 1499,
    brand: 'ANHA',
    rating: 4.7
  },
  {
    id: 8,
    name: 'ANHA Casual Joggers',
    image: casualJoggers,
    price: 999,
    brand: 'ANHA',
    rating: 4.3
  },
];

const ProductList = () => {
  const navigate = useNavigate();

  // FILTER STATES
  const [brand, setBrand] = useState('');  
  const [maxPrice, setMaxPrice] = useState('');

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  // FILTER LOGIC
  const filteredProducts = dummyProducts.filter(product => {
    const brandMatch = brand ? product.brand === brand : true;
    const priceMatch = maxPrice ? product.price <= parseInt(maxPrice) : true;
    return brandMatch && priceMatch;
  });

  return (
    <Grid container spacing={3} padding={2}>
      {filteredProducts.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ borderRadius: '16px', boxShadow: 4 }}>
            <CardMedia
              component="img"
              height="250"
              image={product.image}
              alt={product.name}
              style={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: ⭐ {product.rating}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary">
                Buy Now
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleViewDetails(product.id)}
                className="view-details-button"
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
