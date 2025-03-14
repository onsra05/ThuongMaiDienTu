import { memo, useEffect, useState } from "react"
import "./style.scss"

import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillWechat, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
const Header = () => {
    const navigate = useNavigate();
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN');
    };

    const [user, setUser] = useState(null);
    const [name, setName] = useState('');

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


    return (
        <div className="header__top">
            <div className="container">
                <div className="row">
                    <div className="col-6 header__top__left">
                        <Link to="/" className="logo">electric shop</Link>
                    </div>
                    <div className="col-6 header__top__right ">
                        <ul>
                            <li> <Link to={""}><AiFillFacebook /></Link> </li>
                            <li><Link to={""}><AiFillInstagram /></Link></li>
                            <li><Link to={""}><AiFillTwitterCircle /></Link></li>
                            <li><Link to={""}><AiFillWechat /></Link></li>
                            <li ><Link to={""}><AiOutlineUser /></Link>
                                {user ? (
                                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                                        {name} (Đăng xuất)
                                    </span>
                                ) : (
                                    <span onClick={() => navigate(ROUTERS.USER.LOGIN)}>Đăng nhập</span>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* cart */}
                <div className="header__cart">
                    <div className="header__cart_price">
                        <span>{formatPrice(0)} đ</span>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link to="/carts">
                                    <AiOutlineShoppingCart/> <span>0</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Header)