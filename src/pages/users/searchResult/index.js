// src/pages/SearchResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const SearchResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchResults = location.state?.results || [];
    const keyword = location.state?.keyword || '';

    const handleProductClick = (id) => {
        navigate(`/details/${id}`);
      };

    return (
        <div className="back">
            <div className="search-result-container">
                <h2 className="search-title">Kết quả tìm kiếm cho: "{keyword}"</h2>

                {searchResults.length > 0 ? (
                    <div className="product-grid">
                        {searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.productId)}
                            >
                                <img
                                    src={product.image || '/no-image.jpg'}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price?.toLocaleString()} đ</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>Rất tiếc, trang không tìm thấy kết quả nào phù hợp với từ khóa.</h3>
                        <p>Để tìm được kết quả chính xác hơn, bạn vui lòng:</p>
                        <ul>
                            <li>Kiểm tra lỗi chính tả của từ khóa đã nhập</li>
                            <li>Thử lại bằng từ khóa khác</li>
                            <li>Thử lại bằng những từ khóa tổng quát hơn</li>
                            <li>Thử lại bằng những từ khóa ngắn gọn hơn</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultPage;
