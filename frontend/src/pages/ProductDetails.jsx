// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Sneakers from '../assets/sneakers.png';
import Watch from '../assets/watch.png';
import MensPerfume from '../assets/Mensperfume.png';
import MensFacewash from '../assets/mensfacewash.png';
import blackDenimJacket from "../assets/blackDenimjacket.png";  // ✅ matches existing file
import classicWhitetshirt from "../assets/tshirt.png";              // ✅ assuming this is the white tee
import goldHoodie from "../assets/hoodie.png";                   // ✅ matches file
import casualJoggers from "../assets/joggers.png";
import './ProductDetail.css';
const mockProducts = [
  {
    id: '1',
    name: 'ANha Watch',
    price: 799,
    image: Watch,
    rating: 4.5,
    description: 'A stylish and durable ANha branded watch, perfect for any occasion.',
  },
  {
    id: '2',
    name: 'ANha Sneakers',
    price: 1599,
    image: Sneakers,
    rating: 4.7,
    description: 'Comfortable and trendy sneakers to keep you moving in style.',
  },
  {
    id: '3',
    name: 'ANha Mens Perfume',
    price: 1299,
    image: MensPerfume,
    rating: 4.6,
    description: 'Long-lasting fragrance for the modern man.',
  },
  {
    id: '4',
    name: 'ANha Mens Facewash',
    price: 999,
    image: MensFacewash,
    rating: 4.4,
    description: 'Gentle yet effective facewash for glowing and clean skin.',
  },
  {
     id :'5',
     name: 'ANHA Black Denim Jacket',
    image: blackDenimJacket,
    price: 2199,
    brand: 'ANHA',
    rating: 4.5
  },
  {
    id:'6',
    name: 'ANHA Classic White Tee',
    image: classicWhitetshirt,
    price: 799,
    brand: 'ANHA',
    rating: 4.2
  },
  {
    id:'7',
    name: 'ANHA Gold Hoodie',
    image: goldHoodie,
    price: 1499,
    brand: 'ANHA',
    rating: 4.7
  },
  {
       id:'8',
       name: 'ANHA Casual Joggers',
        image:casualJoggers ,
        price: 999,
        brand: 'ANHA',
        rating: 4.3
  }

];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="product-not-found">
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="error">
          Product not found!
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
      </div>
    );
  }

  return (
    
    <Box className='product-detail-container' sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }} >
      <Card sx={{ maxWidth: 400 }} className='product-image-card'>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          className='product-image'
        />
      </Card>

      <Card className="product-info-card" sx={{ flex: 1, p: 2 }}>
        <CardContent>
          <Typography className="product-title" variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography className="product-price" variant="h6" color="text.secondary" gutterBottom>
            ₹{product.price}
          </Typography>
          <Typography className="product-description" variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography className="product-rating" variant="body2" color="text.secondary">
            Rating: ⭐ {product.rating}
          </Typography>
        </CardContent>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button className="product-buttons"  variant="contained" color="primary">
            Buy Now
          </Button>
          <Button className="product-buttons" variant="outlined" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetail;
