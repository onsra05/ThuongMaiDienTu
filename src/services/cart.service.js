
import axios from "axios";

export const addToOrder = async (email, products) => {
  const cartKey = "guest_cart";
  let guestCart = JSON.parse(localStorage.getItem(cartKey)) || [];

  console.log("Trước khi thêm:", guestCart);
  if (products && products.length > 0) {
    guestCart = [...guestCart, ...products];
    localStorage.setItem(cartKey, JSON.stringify(guestCart));
  }
  console.log("Sau khi thêm:", JSON.parse(localStorage.getItem(cartKey)));

  if (guestCart.length === 0) return;
  try {
    await axios.put(`${process.env.REACT_APP_BASE_URL}/cart/user/${email}`, {
      products: guestCart,
    });

    localStorage.removeItem(cartKey);
    console.log("Đã đồng bộ giỏ hàng.");
  } catch (error) {
    console.error("Lỗi khi đồng bộ giỏ hàng:", error);
  }
};

// lay cartId theo email
export const fetchCartIdByEmail = async (email) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/user/${email}`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy cartId:", error);
    return null;
  }
};


