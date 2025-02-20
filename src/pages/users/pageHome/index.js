import { memo } from "react";
import "./style.scss";

import { useRef, useState, useEffect } from "react";

const ProductList = ({ title, products }) => {
  const listRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

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
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={product.name} className="product__image" />
              <h3 className="product__name">{product.name}</h3>
              <p className="product__price">{product.price}</p>
            </div>
          ))}
        </div>
        {showButtons && <button className="scroll-button right" onClick={scrollRight}>❯</button>}
      </div>
    </div>
  );
};


const HomePage = () => {
  const featuredProducts = [
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 1", price: "$10.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 2", price: "$15.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm 3", price: "$20.00" },
  ];

  const favoriteProducts = [
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm A", price: "$25.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm B", price: "$30.00" },
    { image: "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-44.jpg.webp", name: "Sản phẩm C", price: "$35.00" },
  ];

  return (
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
      
      <ProductList title="Sản phẩm nổi bật" products={featuredProducts} />
      <ProductList title="Sản phẩm được yêu thích nhất" products={favoriteProducts} />
    </div>
  );
};

export default memo(HomePage);
