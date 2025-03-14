import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail__image" />
      <div className="product-detail__info">
        <h2 className="product-detail__name">{product.name}</h2>
        <p className="product-detail__price">Giá: {product.price.toLocaleString("vi-VN")} đ</p>
        {product.discount > 0 && (
          <p className="product-detail__discount">Giảm giá: {product.discount}%</p>
        )}
        <p className="product-detail__description">{product.description}</p>
      </div>
    </div>
  );
};

export default DetailProduct;
