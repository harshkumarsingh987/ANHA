// src/components/ProductCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card sx={{ maxWidth: 280, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="260"
        image={product.image || '/placeholder.jpg'}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" onClick={handleView}>
          View
        </Button>
        <Button size="small" variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
