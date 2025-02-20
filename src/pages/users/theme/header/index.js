import { memo } from "react"
import "./style.scss"

import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillWechat, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
const Header = () => {
    const navigate = useNavigate();
    return <div className="header__top">
        <div className="container">
            <div className="row">
                <div className="col-6 header__top__left"></div>
                <div className="col-6 header__top__right ">
                    <ul>
                        <li> <Link to={""}><AiFillFacebook /></Link> </li>
                        <li><Link to={""}><AiFillInstagram /></Link></li>
                        <li><Link to={""}><AiFillTwitterCircle /></Link></li>
                        <li><Link to={""}><AiFillWechat /></Link></li>
                        <li onClick={()=> navigate(ROUTERS.USER.LOGIN)}><Link to={""}><AiOutlineUser /></Link>
                            <span>dang nhap</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default memo(Header)