import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Box,
  TextField,
  Divider,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Image from '../assets/tshirt.png';
import Hoodieimage from '../assets/hoodie.png';
import './Cart.css';

const initialCartItems = [
  {
    id: '1',
    name: 'ANha Cotton T-Shirt',
    price: 799,
    image: Image,
    quantity: 1,
  },
  {
    id: '2',
    name: 'ANha Hoodie',
    price: 1299,
    image: Hoodieimage,
    quantity: 2,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box className="cart-container">
      {/* Header with Menu Icon and Search Bar */}
      <Box display="flex" alignItems="center" justifyContent="flex-start" mb={4} flexWrap="wrap" gap={2}>
        <IconButton edge="start" className="menu-icon" sx={{ mr: 2 }}>
          <span style={{ fontSize: '1.5rem' }}>☰</span>
        </IconButton>
        <TextField
          label="Search products"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
      </Box>

      <Typography variant="h4" gutterBottom className="cart-title">
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card className="cart-card" elevation={3}>
                  <CardMedia component="img" height="180" image={item.image} alt={item.name} />
                  <CardContent className="cart-card-content">
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price}
                    </Typography>

                    <Box display="flex" alignItems="center" mt={2}>
                      <TextField
                        type="number"
                        size="small"
                        label="Qty"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        inputProps={{ min: 1 }}
                        sx={{ width: '80px', marginRight: 2 }}
                      />
                      <IconButton color="error" onClick={() => removeItem(item.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography className="cart-total" variant="h5" align="right">
            Total: ₹{totalAmount}
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained"className="cart-checkout-btn" color="primary">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
