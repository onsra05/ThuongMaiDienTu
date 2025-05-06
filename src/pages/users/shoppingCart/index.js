
import React, { useState, useEffect } from 'react';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import "./style.scss";
import { deleteAllCartItems, deleteCartItemById, fetchCartItemsByUserId } from '../../../services/cart.service';
import { createOrder } from '../../../services/order.service';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paypalButtonRendered, setPaypalButtonRendered] = useState(false); // State to track if PayPal button has been rendered
  const userId = localStorage.getItem("id");

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  useEffect(() => {
    if (!userId) return;
    const loadCart = async () => {
      try {
        const items = await fetchCartItemsByUserId(userId);
        setCartItems(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [userId]);

  useEffect(() => {
    if (cartItems.length > 0 && !paypalButtonRendered) {
      setPaypalButtonRendered(true);
      renderPaypalButton();
    }
  }, [cartItems, paypalButtonRendered]);

  const onChangeQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => item.cartDetailId === id ? { ...item, quantity: newQuantity } : item));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = async () => {
    const confirmClear = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?');
    if (!confirmClear) return;

    try {
      await deleteAllCartItems(cartItems);
      setCartItems([]);
    } catch (error) {
      alert('Đã có lỗi khi xóa giỏ hàng.');
    }
  };

  const handleRemoveCartItem = async (cartDetailId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?');
    if (!confirmDelete) return;

    try {
      await deleteCartItemById(cartDetailId);
      const updatedCart = cartItems.filter(item => item.cartDetailId !== cartDetailId);
      setCartItems(updatedCart);
    } catch (error) {
      alert('Xóa sản phẩm không thành công.');
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    const email = localStorage.getItem("email");
    const cartId = localStorage.getItem("cartId");
    const orderData = {
      cartId: Number(cartId),
    };
    const confirmCheckout = window.confirm("Bạn có chắc chắn muốn đặt hàng?");
    if (!confirmCheckout) {
        return;
    }
    try {
      const result = await createOrder(email, orderData);
      console.log("Đặt hàng thành công:", result);
      alert("Đặt hàng thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
      alert("Đặt hàng thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
    }
  };

  const renderPaypalButton = () => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: subtotal,
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Thanh toán thành công: " + details.payer.name.given_name);
            handleCheckout();
          });
        },
        onError: (err) => {
          alert("Đã có lỗi trong quá trình thanh toán.");
          console.error(err);
        },
      }).render('#paypal-button-container');
    }
  };

  return (
    <div className="back">
      {loading ? (
        <div>Đang tải giỏ hàng...</div>
      ) : cartItems.length === 0 ? (
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
      ) : (
        <div className="cart">
          <div className="cart__container">
            <div className="cart__header">
              <h1 className="cart__title">Giỏ hàng của bạn ({cartItems.length})</h1>
              <button className="cart__clear-btn" onClick={handleClearCart}>Xóa tất cả</button>
            </div>
            <div className="cart__content">
              <div className="cart__items">
                {cartItems.map(item => (
                  <div key={item.cartDetailId} className="cart__item">
                    <div className="cart__item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    <div className="cart__item-info">
                      <h3 className="cart__item-name">{item.product.name}</h3>
                      <p className="cart__item-color">Màu: {item.product.color || 'N/A'}</p>
                      <div className="cart__item-quantity">
                        <button
                          className="cart__item-quantity-btn"
                          onClick={() => onChangeQuantity(item.cartDetailId, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="cart__item-quantity-value">{item.quantity}</span>
                        <button
                          className="cart__item-quantity-btn"
                          onClick={() => onChangeQuantity(item.cartDetailId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart__item-price">
                      <p className="cart__item-current-price">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="cart__item-remove">
                      <button
                        className="cart__item-remove-btn"
                        onClick={() => handleRemoveCartItem(item.cartDetailId)}
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__summary">
                <div className="cart__summary-total">
                  <span>Tổng tiền:</span>
                  <span className="cart__summary-total-price">{formatPrice(subtotal)}</span>
                </div>
                <button className="cart__checkout-btn" onClick={handleCheckout}>Tiến hành đặt hàng(COD)</button>
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
