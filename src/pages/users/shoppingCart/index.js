import { memo, useState, useEffect } from "react";
import "./style.scss";

const ShoppingCart = ({ email }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ API
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cart/user/${email}`);
        if (!response.ok) {
          throw new Error("Lấy dữ liệu giỏ hàng không thành công");
        }
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [email]);

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div className="back">
      <div className="container">
        <h2>Giỏ hàng</h2>
        {cart.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <span>{(item.price * item.quantity).toLocaleString()} VNĐ</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3>Tổng: {totalPrice.toLocaleString()} VNĐ</h3>
        {cart.length > 0 && <button className="checkout-btn">Thanh toán</button>}
      </div>
    </div>
  );
};

export default memo(ShoppingCart);
