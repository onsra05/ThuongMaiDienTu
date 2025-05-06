// cart
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
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy cartId:", error);
    return null;
  }
};


// ===================== cart detail =====================
// Lấy giỏ hàng theo userId
export const fetchCartItemsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cartDetail/cart/${userId}`);
    return response.data || [];
  } catch (error) {
    console.error("Lỗi khi tải giỏ hàng:", error);
    throw error;
  }
};

// Thêm sản phẩm vào giỏ hàng
export const addCartDetail = async (cartId, payload) => {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/cartDetail`, payload);
    console.log("Đã thêm sản phẩm vào cartDetail");
  } catch (error) {
    console.error("Lỗi khi thêm vào cartDetail:", error);
  }
};

// Xóa 1 giỏ hàng theo ID
export const deleteCartItemById = async (cartDetailId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/cartDetail/${cartDetailId}`);
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
};

// Xóa toàn bộ giỏ hàng 
export const deleteAllCartItems = async (cartItems) => {
  try {
    await Promise.all(
      cartItems.map((item) =>
        axios.delete(`${process.env.REACT_APP_BASE_URL}/cartDetail/${item.cartDetailId}`)
      )
    );
    console.log("Giỏ hàng đã được xóa sạch.");
  } catch (error) {
    console.error("Lỗi khi xóa tất cả sản phẩm trong giỏ hàng:", error);
    throw error;
  }
};