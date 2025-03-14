import axios from "axios";

export const fetchProducts = async (page, size) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?page=${page}&size=${size}`);
    return {
      products: response.data.content,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// them san pham
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// sua spham
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// xoa spam
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`$process.env.REACT_APP_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
