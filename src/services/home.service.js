
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


// recoment
export const fetchRecommendationProducts = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/recommendations/nopage/${userId}`);
    console.log("Recommendation response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendation products:", error.message);
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
  // try {
  //   const res = await axios.get("http://localhost:8080/api/recommendations/nopage/9");
  //   if (res.data) {
  //     console.log("Products:", res.data);
  //   } else {
  //     console.warn("No data received from API.");
  //   }
  // } catch (err) {
  //   console.error("Request failed:", err.message);
  // }
};

// export const fetchRecommendationProducts = async () => {
//   try {
//     const userId = localStorage.getItem("id");
//     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/recommendations/nopage/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recommendations:", error);
//     throw error;
//   }
// };