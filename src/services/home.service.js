
import axios from 'axios';

// sp noi bat
export const fetchFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
    return response.data.content || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

// sanpham yeu thich
export const fetchFavoriteProducts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/bestseller`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};
