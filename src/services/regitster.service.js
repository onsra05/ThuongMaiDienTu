import axios from 'axios';
// dang ky
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Đăng ký thất bại";
  }
};
