
import React, { useState } from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import "./style.scss";

const EmptyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  

  // Định dạng giá VND
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  // Dữ liệu cứng
  const dummyItems = [
    {
      id: 1,
      name: "Sản phẩm A",
      color: "Đỏ",
      image: "https://via.placeholder.com/100",
      price: 200000,
      originalPrice: 250000,
      discount: 50000,
      quantity: 6,
    },
    {
      id: 2,
      name: "Sản phẩm B",
      color: "Xanh",
      image: "https://via.placeholder.com/100",
      price: 300000,
      originalPrice: 350000,
      discount: 50000,
      quantity: 2,
    },
  ];
  const [items, setItems] = useState(dummyItems);

  const onChangeQuantity = (id, newQuantity) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const subtotal = dummyItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="back">
      {cartItems.length === 0 ? (
        <div className="cart">
          <div className="cart__container">
            <div className="cart__header">
              <h1 className="cart__title">Giỏ hàng của bạn ({dummyItems.length})</h1>
              <button className="cart__clear-btn">Xóa tất cả</button>
            </div>
            <div className="cart__content">
              <div className="cart__items">
                {dummyItems.map(item => (
                  <div key={item.id} className="cart__item">
                    <div className="cart__item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart__item-info">
                      <h3 className="cart__item-name">{item.name}</h3>
                      <p className="cart__item-color">Màu: {item.color}</p>
                      <div className="cart__item-quantity">
                      <button
                        className="cart__item-quantity-btn"
                        onClick={() => onChangeQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="cart__item-quantity-value">{item.quantity}</span>
                      <button
                        className="cart__item-quantity-btn"
                        onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    </div>
                    <div className="cart__item-price">
                      <p className="cart__item-current-price">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__summary">
                <div className="cart__summary-total">
                  <span>Tổng tiền:</span>
                  <span className="cart__summary-total-price">{formatPrice(subtotal)}</span>
                </div>
                <button className="cart__checkout-btn">Tiến hành đặt hàng</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart">
          <div className="cart__container">
            <div className="cart__empty">
              <div className="cart__empty-image">
                <MdOutlineRemoveShoppingCart />
              </div>
              <h2 className="cart__empty-title">Giỏ hàng trống</h2>
              <p className="cart__empty-subtitle">Không có sản phẩm nào trong giỏ hàng</p>
              <a href="/" className="cart__empty-button">Về trang chủ</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyCart;


