import { memo, useEffect, useState } from "react"
import "./style.scss"

import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillWechat, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import Search from "../../../../components/search";
const Header = () => {
    const navigate = useNavigate();
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('name');

        if (token && userName) {
            setUser(true);
            setName(userName);
        } else {
            setUser(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(false);
        setName('');
        navigate('/');
    };

    // const handleSearch = async () => {
    //     const keyword = search.trim();
    //     if (!keyword) return;

    //     const userId = JSON.parse(localStorage.getItem('id'));
    //     try {
    //         const response = await searchProduct(userId, keyword);
    //         navigate('/search-results', {
    //             state: {
    //                 results: response.data,
    //                 keyword
    //             }
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    //     }
    // };


    const drop = () => {
        setDropDown((dropDown) => !dropDown);
    }

    return (
        <div className="header__top">
            <div className="container">
                <div className="header__top__wrapper">
                    {/* logo */}
                    <div className="header__top__left">
                        <Link to="/" className="logo">electric shop</Link>
                    </div>

                    {/* tim kiem*/}
                    {/* <div className="header__search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div> */}
                    <Search user={user} />

                    {/**/}
                    <div className="header__top__right__wrapper">
                        <div className="header__top__right">
                            <ul>
                                <li><Link to=""><AiFillFacebook /></Link></li>
                                <li><Link to=""><AiFillInstagram /></Link></li>
                                <li><Link to=""><AiFillTwitterCircle /></Link></li>
                                <li><Link to=""><AiFillWechat /></Link></li>
                                <li>
                                    <Link to=""><AiOutlineUser /></Link>
                                    {user ? (
                                        <div className="user-dropdown">
                                            <span className="user-name" onClick={drop}>{name}</span>
                                            {dropDown && (
                                                <div className="dropdown-menu">
                                                    <div onClick={() => { setDropDown(false); navigate(ROUTERS.USER.ORDERHISTORY); }}>
                                                        Đơn hàng của tôi
                                                    </div>
                                                    <div onClick={() => { setDropDown(false); handleLogout(); }}>
                                                        Đăng xuất
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <span onClick={() => navigate(ROUTERS.USER.LOGIN)}>Đăng nhập</span>
                                    )}
                                </li>
                            </ul>
                        </div>

                        <div className="header__cart">
                            <div className="header__cart_price">
                                <span>{formatPrice(0)} đ</span>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <Link to="/carts">
                                            <AiOutlineShoppingCart /> <span>0</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
export default memo(Header)