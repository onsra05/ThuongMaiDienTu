import { memo } from "react";
import { useState, useEffect, useRef } from "react";
import "./style.scss";

const ProductList = ({ title, products }) => {
  const listRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  // dinh dang gia vnd 
  const formatPrice = (price) =>{
    return price.toLocaleString('vi-VN');
  };

  useEffect(() => {
    if (listRef.current) {
      setShowButtons(listRef.current.scrollWidth > listRef.current.clientWidth);
    }
  }, [products]);

  

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="product-section">
      <h2 className="product-section__title">{title}</h2>
      <div className="product-section__wrapper">
        {showButtons && <button className="scroll-button left" onClick={scrollLeft}>❮</button>}
        <div className="product-section__list" ref={listRef}>
          {products?.map((product, index) => (
            <div className="product" key={index}>
              <img src={product?.image} alt={product?.name} className="product__image" />
              <h3 className="product__name">{product?.name}</h3>
              <p className="product__price">{formatPrice(product?.price) } đ</p>
            </div>
          ))}
        </div>
        {showButtons && <button className="scroll-button right" onClick={scrollRight}>❯</button>}
      </div>
    </div>
  );
};


const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
  // sp ban chay
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();
      setFeaturedProducts(data.content || []); // Lấy mảng từ `content`
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  // sp yeu thich
  const fetchFavoriteProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products/bestseller");
      const data = await response.json();
      setFavoriteProducts(data || []); // Lấy mảng từ `content`
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  fetchFeaturedProducts();
  fetchFavoriteProducts();
}, []);


  return (
    <div className="back">
      <div className="container">
        <div className="banner">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRXI0gh51DSoPcJwx2EM8HSsdQM_gZ3AXGFw&s"
            alt="Banner"
            className="banner__image"
          />
          <div className="banner__overlay">
            <h1 className="banner__title">Chào mừng đến với Shop của chúng tôi!</h1>
            <p className="banner__text">Ưu đãi đặc biệt cho khách hàng mới - Giảm giá 20% hôm nay!</p>
            <button className="banner__button">Mua Ngay</button>
          </div>
        </div>

        {/* // render */}
        <ProductList title="Sản phẩm nổi bật" products={featuredProducts} />
        <ProductList title="Sản phẩm ban chay nhất" products={favoriteProducts} />
      </div>
    </div>
  );
};

export default memo(HomePage);
