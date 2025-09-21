import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Products.css";
import ProductFilter from "../components/Productfilter";

// Local images
import Sneakers from "../assets/sneakers.png";
import Watch from "../assets/watch.png";
import MensPerfume from "../assets/Mensperfume.png";
import MensFacewash from "../assets/mensfacewash.png";

const mockProducts = [
  {
    id: "1",
    name: "ANha Watch",
    price: 799,
    image: Watch,
    rating: 4.5,
  },
  {
    id: "2",
    name: "ANha Sneakers",
    price: 1599,
    image: Sneakers,
    rating: 4.7,
  },
  {
    id: "3",
    name: "ANha Mens Perfume",
    price: 1299,
    image: MensPerfume,
    rating: 4.6,
  },
  {
    id: "4",
    name: "ANha Mens Facewash",
    price: 999,
    image: MensFacewash,
    rating: 4.4,
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hasFiltered, setHasFiltered] = useState(false);


  
const handleBuyNow = async (product) => {
  try {
    // 1) Create order on backend (amount in rupees)
    const { data: order } = await axios.post("http://localhost:8000/api/payment/create-order", {
      amount: product.price, // e.g., 1499 = ₹1499
      notes: { productId: product.id || product._id, name: product.name },
    });

    // 2) Configure checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: order.amount, // in paise
      currency: order.currency,
      name: "ANha Store",
      description: product.name,
      order_id: order.id, // from backend
      prefill: {
        name: "ANha Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#111827" },

      // Called on successful payment
      handler: async function (response) {
        try {
          // 3) Verify on backend
          const verifyRes = await axios.post("http://localhost:8000/api/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment successful ✅");
            // TODO: redirect to order success page, save order, etc.
          } else {
            alert("Payment verification failed ❌");
          }
        } catch (e) {
          console.error("Verification error:", e);
          alert("Verification error");
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },
    };

    // 3) Open Razorpay
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Buy Now error:", err);
    alert("Unable to start payment");
  }
};
  const handleApplyFilters = async (filters) => {
    try {
      const { brand, category, priceRange, color, rating } = filters;
      const query = {
        ...(brand !== "All" && { brand }),
        ...(category !== "All" && { category }),
        ...(color && { color }),
        ...(rating && { rating }),
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      const response = await axios.post("http://localhost:8000/api/products/filter", query);
      setFilteredProducts(response.data);
      setHasFiltered(true);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const renderProductCard = (product) => (
    <Grid item key={product._id || product.id} xs={12} sm={6} md={3}>
      <Card className="product-card" elevation={4}>
        <CardMedia
          component="img"
          height="220"
          image={product.image }
           style={{ objectFit: "cover", width: "100%" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: ⭐ {product.rating || "N/A"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
  size="small"
  variant="contained"
  color="primary"
  onClick={() => handleBuyNow(product)}
>
  Buy Now
</Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleViewDetails(product._id || product.id)}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Box className="products-container">
      <Typography variant="h4" className="section-title">
        Explore ANHA Collection
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <aside className="filter-sidebar">
            <ProductFilter onApplyFilters={handleApplyFilters} />
          </aside>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {(hasFiltered ? filteredProducts : mockProducts).map(renderProductCard)}
            {!hasFiltered && mockProducts.length === 0 && (
              <Typography variant="subtitle1">
                No mock products available.
              </Typography>
            )}
            {hasFiltered && filteredProducts.length === 0 && (
              <Typography variant="subtitle1">
                No products match the filter.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
