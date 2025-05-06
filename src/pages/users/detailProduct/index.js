import React, { useEffect, useState } from 'react';
import './style.scss';
import { FiHeart } from 'react-icons/fi';
import { useParams } from "react-router-dom";
import { fetchProductByCategory, fetchProductById } from '../../../services/product.service';
import { addCartDetail, fetchCartIdByEmail } from '../../../services/cart.service';
import { jwtDecode } from "jwt-decode";

const DetailProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);


  useEffect(() => {
    const getProductDetails = async () => {
      if (!id) return;
      try {
        const product = await fetchProductById(id);
        setData(product);

        if (product && product.category) {
          const allProducts = await fetchProductByCategory(product.category.categoryId);

          const related = allProducts.filter((p) =>
            p?.category?.categoryId === product?.category?.categoryId &&
            p?.productId !== product?.productId
          ).slice(0, 4);

          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };
    getProductDetails();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    const cartKey = "guest_cart";
    const productWithQuantity = { ...product, quantity };
  
    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.sub;
  
      try {
        const cartIdResponse = await fetchCartIdByEmail(email);
        if (!cartIdResponse || !cartIdResponse.cartId) {
          console.error("Không tìm thấy cartId!");
          alert("Không tìm thấy giỏ hàng của bạn.");
          return;
        }
  
        // Gửi dữ liệu vào cartDetail
        const payload = {
          quantity: productWithQuantity.quantity,
          price: productWithQuantity.price - productWithQuantity.discount,
          product: {
            productId: productWithQuantity.productId,
            category: {
              categoryId: productWithQuantity.category.categoryId,
            },
          },
          cart: {
            cartId: cartIdResponse.cartId,
            // user: {
            //   email: email,
            // },
            amount: productWithQuantity.price * productWithQuantity.quantity,
          },
        };
  
        await addCartDetail(cartIdResponse.cartId, payload);
  
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      }
    } else {
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existingIndex = cart.findIndex((item) => item.productId === product.productId);
  
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += productWithQuantity.quantity;  // Cập nhật quantity
      } else {
        cart.push(productWithQuantity);
      }
  
      localStorage.setItem(cartKey, JSON.stringify(cart));
      alert("Sản phẩm đã được thêm vào giỏ hàng tạm thời.");
    }
  };
  
  


  useEffect(() => {
    const getCartID = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;
  
      try {
        const cart = await fetchCartIdByEmail(email);
        localStorage.setItem("cartId", cart.cartId);
      } catch (error) {
        console.error("Lỗi khi lấy cart ID:", error);
      }
    };
  
    getCartID();
  }, []);
  
  
  return (

    <div className="back">
      <div className="container">
        <div className="detail-product">
          <div className="product-main">
            {/* Product gallery */}
            <div className="product-gallery">
              <img
                src={data?.image}
                alt={data?.name}
                className="main-image"
              />
            </div>

            {/* Product info */}
            <div className="product-info">
              <h1>{data?.name}</h1>

              <div className="product-meta">
                <div className="product-sku">Mã SP: {data?.productId}</div>
                <div className="product-rating">
                  <div className="stars">
                    <span className="filled">★</span>
                    <span className="filled">★</span>
                    <span className="filled">★</span>
                    <span className="filled">★</span>
                    <span className="filled">★</span>
                  </div>
                  <span className="review-count">{data?.sold} đã bán</span>
                </div>
              </div>

              <div className="product-price">
                <div className="current-price">
                  {formatPrice(data?.price - data?.discount)}
                </div>
                {data?.discount > 0 && (
                  <>
                    <div className="original-price">{formatPrice(data?.price)}</div>
                    <div className="discount-badge">
                      -{((data?.discount / data?.price) * 100).toFixed(0)}%
                    </div>
                  </>
                )}
              </div>

              <div className="stock-status">
                <span>Tình trạng:</span>
                <span className={data?.quantity > 0 ? "in-stock" : "out-of-stock"}>
                  {data?.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>

              {/* Quantity selector  */}
              <div className="quantity-selector">
                <span>Số lượng:</span>
                <div className="quantity-control">
                  <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                  <input type="text" value={quantity} readOnly />
                  <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="product-actions">
                <button className="btn-buy-now" onClick={() => addToCart(data)} >Thêm vào giỏ hàng</button>
                <div className="secondary-actions">
                  <button className="btn-favorite">
                    <FiHeart />
                    <span>Yêu thích</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* description o day */}
          <div className="product-description">
            <h2 className="description-title">{data?.name}</h2>
            <p>{data?.description}</p>
          </div>

          {/* Related products */}
          <div className="related-products">
            <h2 className="related-title">Sản phẩm tương tự</h2>
            <div className="related-list">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((product) => (
                  <div
                    key={product?.productId}
                    className="related-item"
                    onClick={() => setData(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="related-image">
                      <img src={product?.image} alt={product?.name} />
                    </div>
                    <div className="related-name">{product?.name}</div>
                    <div className="related-prices">
                      {product?.discount > 0 ? (
                        <>
                          <div className="related-discount-price">
                            {formatPrice(product?.price - product?.discount)}
                          </div>
                          <div className="related-original-price">
                            {formatPrice(product?.price)}
                          </div>
                        </>
                      ) : (
                        <div className="related-price">{formatPrice(product?.price)}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm tương tự.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default DetailProduct;
