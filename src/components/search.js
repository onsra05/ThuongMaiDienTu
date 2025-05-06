// Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProduct } from '../services/product.service';

const Search = ({ user }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        const keyword = search.trim();
        if (!keyword) return;

        let userId = null;
        if (user) {
            userId = JSON.parse(localStorage.getItem('id'));
        }

        try {
            const response = await searchProduct(userId, keyword);
            navigate('/search-results', {
                state: {
                    results: response.data,
                    keyword
                }
            });
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        }
    };

    return (
        <div className="header__search">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
        </div>
    );
};

export default Search;
