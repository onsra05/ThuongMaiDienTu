

import { memo } from "react";
import { useState, useEffect, useRef } from "react";
import "./style.scss";
import { fetchFavoriteProducts, fetchFeaturedProducts, fetchRecommendationProducts } from "../../../services/home.service";
import { Link } from "react-router-dom";

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
          {products?.map((product ) => (
            <Link to={`/details/${product.productId}`} key={product.id} className="product">
              <img src={product?.image} alt={product?.name} className="product__image" />
              <h3 className="product__name">{product?.name}</h3>
              <p className="product__price">{formatPrice(product?.price) } đ</p>
            </Link>
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
  const [recommendationProducts, setRecommendationProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('id');


  const random = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const [featured, favorite] = await Promise.all([
          fetchFeaturedProducts(),
          fetchFavoriteProducts(),
        ]);
        setFeaturedProducts(random(featured));
        setFavoriteProducts(random(favorite));
  
        if (userId) {
          const recommendation = await fetchRecommendationProducts(userId);
          console.log("Recommendation products:", recommendation);
          setRecommendationProducts(recommendation);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadProducts();
  }, [userId]);
  



  return (
    <div className="back">
      <div className="container">
        <div className="banner">
          <img
            src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c6/b8/c6b898e13ba7a82f25f730cb9418d9ab.png"
            alt="Banner"
            className="banner__image"
          />
        </div>

        {/* // render */}
        {recommendationProducts.length > 0 && (
          <ProductList title="Sản phẩm đề xuất cho bạn" products={recommendationProducts} />
        )}
        <ProductList title="Sản phẩm nổi bật" products={featuredProducts} />
        <ProductList title="Sản phẩm bán chạy nhất" products={favoriteProducts} />
      </div>
    </div>
  );
};

export default memo(HomePage);
