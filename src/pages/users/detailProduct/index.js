import React, { useState } from "react";
import { AiFillStar, AiOutlineStar, AiOutlineShoppingCart } from "react-icons/ai";
import "./style.scss";

const ProductDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${product.name} to cart.`);
    };

    return (
        <div className="product-detail-container">
            <div className="product-images">
                <img src={product.imageUrl} alt={product.name} className="main-image" />
                <div className="image-thumbnails">
                    {product.images.map((img, index) => (
                        <img key={index} src={img} alt="thumbnail" className="thumbnail" />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-rating">
                    {[...Array(5)].map((_, index) => (
                        index < product.rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                    ))}
                    <span> ({product.reviews.length} reviews)</span>
                </div>
                <p className="product-price">${product.price}</p>
                <p className="product-stock">Stock: {product.stock} available</p>
                
                <div className="product-options">
                    <label>Color:</label>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                        {product.colors.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>

                    <label>Size:</label>
                    <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                        {product.sizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                <div className="quantity-control">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="number" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button onClick={handleAddToCart} className="add-to-cart-btn">
                    <AiOutlineShoppingCart /> Add to Cart
                </button>
            </div>
        </div>
    );
};

const DetailProduct = () => {
    const product = {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: 199.99,
        imageUrl: "https://via.placeholder.com/400",
        images: [
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100"
        ],
        colors: ["Black", "White", "Blue"],
        sizes: ["S", "M", "L"],
        stock: 25,
        rating: 4,
        reviews: [
            { user: "Alice", rating: 5, comment: "Amazing sound quality!" },
            { user: "Bob", rating: 4, comment: "Very comfortable to wear." },
        ],
    };

    return (
        <div className="container">
            <ProductDetail product={product} />
        </div>
    );
};

export default DetailProduct;
