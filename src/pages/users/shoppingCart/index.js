import { memo, useState } from "react";
import "./style.scss";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Sản phẩm A", price: 200000, quantity: 1 },
    { id: 2, name: "Sản phẩm B", price: 150000, quantity: 2 },
    { id: 3, name: "Sản phẩm C", price: 300000, quantity: 1 },
  ]);

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

  return (
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
              <button className="remove-btn" onClick={() => removeItem(item.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Tổng: {totalPrice.toLocaleString()} VNĐ</h3>
      {cart.length > 0 && <button className="checkout-btn">Thanh toán</button>}
    </div>
  );
};

export default memo(ShoppingCart);