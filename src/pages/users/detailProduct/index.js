import React, { useEffect, useState } from 'react';
import './style.scss';
import { FiHeart } from 'react-icons/fi';
import { useParams } from "react-router-dom";
import { fetchProductByCategory, fetchProductById } from '../../../services/product.service';
import { addToOrder, fetchCartIdByEmail } from '../../../services/cart.service';
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
    console.log("Sản phẩm thêm vào giỏ hàng:", product); // Kiểm tra log

    const token = localStorage.getItem("token"); // Giả sử token lưu trong localStorage với key "token"
    const cartKey = "guest_cart";

    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.sub;
      console.log(email);
      
      
      try {
        // Lấy giỏ hàng hiện tại trong localStorage
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        console.log(cart);

        // Kiểm tra sản phẩm đã tồn tại chưa
        const existingProductIndex = cart.findIndex((item) => item.productId === product.productId);

        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng
          cart[existingProductIndex].quantity += product.quantity;
        } else {
          // Nếu chưa tồn tại, thêm sản phẩm mới
          cart.push({ ...product });
        }

        // Lưu lại vào localStorage trước khi đồng bộ
        localStorage.setItem(cartKey, JSON.stringify(cart));

        // Đồng bộ giỏ hàng lên server với token
        await addToOrder(email, cart); // Giả sử addToOrder yêu cầu token để đồng bộ

        // Xóa giỏ hàng sau khi đồng bộ thành công
        localStorage.removeItem(cartKey);

        console.log("Giỏ hàng sau khi thêm:", cart);
        alert("Sản phẩm đã được thêm vào giỏ hàng của bạn!");
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        alert("Đã xảy ra lỗi khi đồng bộ giỏ hàng.");
      }
    } else {
      // Nếu chưa đăng nhập, lưu vào localStorage
      let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existingProductIndex = cart.findIndex((item) => item.productId === product.productId);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity;
      } else {
        cart.push({ ...product });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));

      console.log("Giỏ hàng sau khi thêm (chưa đăng nhập):", cart);
      alert("Sản phẩm đã được thêm vào giỏ hàng tạm thời.");
    }
  };

  const getCartID = async () => {
    const email = localStorage.getItem("email");
    const cart = await fetchCartIdByEmail(email);
    console.log(cart.cartId);
    localStorage.setItem("cartId", cart.cartId);
  };
  getCartID();

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
