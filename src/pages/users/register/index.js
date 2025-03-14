import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { ROUTERS } from "../../../utils/router";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: true,
        status: true,
        image: "https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg",
        registerDate: new Date().toISOString(),
        role: ["user"]
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", formData);
            console.log("Đăng ký thành công", response.data);
            navigate(ROUTERS.USER.LOGIN);
        } catch (err) {
            setError(err.response?.data?.message || "Đăng ký thất bại");
        }
    };

    return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="register-box">
                    <h2 className="register-title">Đăng ký</h2>
                    {error && <p className="register-error">{error}</p>}
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input className="register-input" type="text" name="name" placeholder="Họ và tên" value={formData.name} onChange={handleChange} required />
                        <input className="register-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input className="register-input" type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
                        <input className="register-input" type="text"  name="phone" placeholder="Số điện thoại" value={formData.phone}   onChange={handleChange}  required />
                        <input className="register-input" type="text" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} required />
                        {/* <input className="register-input" type="text" name="image" placeholder="Ảnh đại diện (URL)" value={formData.image} onChange={handleChange} /> */}
                        <button className="register-button" type="submit">Đăng ký</button>
                    </form>
                    <button className="login-link" onClick={() => navigate(ROUTERS.USER.LOGIN)}>Đăng nhập</button>
                </div>
            </div>
        </div>
    );
};

export default Register;