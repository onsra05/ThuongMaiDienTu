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
            setError("Email and password are required.");
            return;
        }
        const data = await e.json();
        // if (data.roles && data.roles.includes('ROLE_ADMIN')) {
        //     navigate('/admin'); // Điều hướng tới trang admin
        //   } else if (data.roles && data.roles.includes('ROLE_USER')) {
        //     // Nếu có vai trò 'ROLE_USER', có thể điều hướng đến trang khác (ví dụ trang chủ)
        //     navigate('/'); // Điều hướng tới trang chủ
        //   } else {
        //     // Nếu không có vai trò hợp lệ, bạn có thể thông báo lỗi hoặc yêu cầu người dùng đăng nhập lại
        //     alert('Vai trò không hợp lệ!');
        //   }

        setLoading(true);
        try {
            const response = await loginService({ email, password });
            localStorage.setItem("name",response.data.name);
            localStorage.setItem("token", response.data.token);
            console.log(response.data.roles);
            
            navigate(ROUTERS.USER.HOME); 
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
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
                        setTimeout(() => {
                            navigate(ROUTERS.USER.HOME);
                        }, 5000);
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
