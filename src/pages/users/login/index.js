import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTERS } from "../../../utils/router";
import { loginService } from "../../../services/auth.service";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError("Email và mật khẩu là bắt buộc.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await loginService({ email, password });
            const { name, token, roles } = response.data;
    
            localStorage.setItem("name", name);
            localStorage.setItem("token", token);
            localStorage.setItem("roles", roles);
    
            // Kiểm tra vai trò và chuyển hướng
            if (roles.includes("ROLE_USER")) {
                setTimeout(() => {
                    navigate(ROUTERS.USER.HOME);
                }, 3000);
               
            } else if (roles.includes("ROLE_ADMIN")) {
                setTimeout(() => {
                    navigate("/admin");
                }, 3000);
            } else {
                setError("Vai trò người dùng không hợp lệ.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="back">
            <div className="container">
                <div className="login-container colorful">
                    <h2>Đăng nhập</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="login-link" onClick={() => {
                        setLoading(true);
                    }}>
                        {loading ? "Đang chuyển hướng..." : "Đăng nhập"}
                    </button>
                        
                    </form>
                    <button type="submit" onClick={() => navigate(ROUTERS.USER.REGISTER)}>Đăng ký</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
