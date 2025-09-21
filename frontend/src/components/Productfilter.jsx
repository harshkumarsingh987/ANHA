import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import './Productfilter.css';

const categories = ['All', 'Clothing', 'Footwear', 'Watches', 'Skincares'];
const brands = ['ANHA', 'Nike', 'Adidas', 'Puma', "Levi's", 'H&M', 'Zara'];
const colors = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000', '#808080'];
const themes = ['Light', 'Dark', 'Black & Gold', 'Denim'];

const ProductFilter = ({ onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    category: 'All',
    priceRange: [0, 10000],
    brand: 'ANHA',
    color: '',
    rating: 1,
    theme: 'Light',
  });

  const handleChange = (key) => (event, value) => {
    const actualValue =
      event && event.target !== undefined ? event.target.value : value;
    setLocalFilters((prev) => ({ ...prev, [key]: actualValue }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  return (
    <Box className="product-filter-container" p={3}>
      <Typography variant="h6" gutterBottom className="filter-title">
        Filter Products
      </Typography>

      {/* Category */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={localFilters.category} onChange={handleChange('category')}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Brand */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Brand</InputLabel>
        <Select value={localFilters.brand} onChange={handleChange('brand')}>
          {brands.map((b) => (
            <MenuItem key={b} value={b}>{b}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Typography gutterBottom>Price Range (₹)</Typography>
      <Slider
        value={localFilters.priceRange}
        onChange={(e, val) => handleChange('priceRange')(e, val)}
        valueLabelDisplay="auto"
        min={0}
        max={10000}
        step={100}
      />

      {/* Rating */}
      <Typography gutterBottom sx={{ mt: 2 }}>
        Rating (1 to 5 Stars)
      </Typography>
      <Slider
        value={localFilters.rating}
        onChange={(e, val) => handleChange('rating')(e, val)}
        valueLabelDisplay="auto"
        min={1}
        max={5}
        step={1}
      />

      {/* Color */}
      <Typography gutterBottom sx={{ mt: 2 }}>Color</Typography>
      <Box display="flex" gap={1} mb={2}>
        {colors.map((clr) => (
          <Box
            key={clr}
            onClick={() => setLocalFilters((prev) => ({ ...prev, color: clr }))}
            sx={{
              backgroundColor: clr,
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: localFilters.color === clr ? '2px solid #000' : '1px solid #ccc',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>

      {/* Theme Toggle */}
      <Typography gutterBottom>Theme</Typography>
      <ToggleButtonGroup
        value={localFilters.theme}
        exclusive
        onChange={handleChange('theme')}
        fullWidth
        sx={{ mb: 2 }}
      >
        {themes.map((t) => (
          <ToggleButton key={t} value={t}>
            {t}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Apply Filters Button */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};

export default ProductFilter;
