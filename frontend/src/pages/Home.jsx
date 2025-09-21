import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  Alert  as MuiAlert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import './Homecss.css';
import Mensimage from '../assets/AnhaB.png';
import  BackgroundImage from '../assets/anhabody.png';



const HomePage = () => {
  const navigate = useNavigate();
 const location = useLocation();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('showSnackbar') === 'true') {
      setSnackbarOpen(true);

      // Clean URL after showing Snackbar
         window.history.replaceState({}, document.title, "/");
    }
  }, [location]);

  const handleShopClick = () => {
    navigate("/products");
  };
const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    const url = new URL(window.location);
    url.searchParams.delete('showSnackbar');
    window.history.replaceState({}, '', url);
  };
  const mensCollection = {
    name: "Men's Collection",
    image :Mensimage, // Ensure this is in your public/images folder
    tagline: "Style That Defines You",
    description: "Explore premium designs tailored for modern men. From sleek casuals to sharp essentials — redefine your wardrobe with ANha.",
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
        {/* ✅ Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
       <MuiAlert
  elevation={6}
  variant="filled"
  onClose={handleSnackbarClose}
  severity="success"
  sx={{ width: "100%" }}
>
  🎉 Congratulations! You are now part of ANHA.
</MuiAlert>
      </Snackbar>
      {/* Hero Section */}
      <Box
      className="hero-section"
        sx={{
          height: { xs: "300px", md: "600px" },
          backgroundImage: `url(${BackgroundImage})`, // Place luxury men's image here
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 3, md: 10 },
          color: "#fff",
        }}
      >
        <Box sx={{ maxWidth: "500px" }}>
          <Typography
            variant="h2"
           sx={{
    fontWeight: 700,
    letterSpacing: 1,
    mb: 2,
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }
  }}
          >
            Elevate Your Style
          </Typography>
          <Typography variant="h6"   sx={{
    mb: 3,
    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
  }}>
            Discover premium fashion exclusively for men. Wear luxury, wear confidence.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              borderRadius: "30px",
              px: 5,
              fontWeight: "bold",
              backgroundColor: "#000",
              "&:hover": { backgroundColor: "#333" },
            }}
            onClick={handleShopClick}
          >
            Shop Men's Collection
          </Button>
        </Box>
      </Box>

      {/* Men's Collection Card */}
      <Box sx={{ py: 8, px: { xs: 2, md: 10 }, backgroundColor: "#fff" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Featured Men's Collection
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid  item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 4,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
      <CardMedia
  component="div"
  className="card-media-fit"
  style={{ backgroundImage: `url(${mensCollection.image})` }}
  alt={mensCollection.name}
/>


              <CardContent sx={{ textAlign: "center", p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#111", mb: 1 }}
                >
                  {mensCollection.tagline}
                </Typography>
                <Typography sx={{ color: "#555", mb: 3 }}>
                  {mensCollection.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleShopClick}
                  sx={{
                    borderRadius: "30px",
                    px: 4,
                    fontWeight: "bold",
                    color: "#000",
                    borderColor: "#000",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  }}
                >
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
