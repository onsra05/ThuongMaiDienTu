import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import "./style.scss";

const menuItems = [
  { key: "dashboard", path: "/admin/dashboard", label: "📊 Dashboard" },
  { key: "products", path: "/admin/products", label: "📦 Quản lý sản phẩm" },
  { key: "orders", path: "/admin/orders", label: "🛒 Đơn hàng" },
  { key: "customers", path: "/admin/customers", label: "👥 Khách hàng" },
  { key: "reports", path: "/admin/reports", label: "📈 Báo cáo" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const handerLogout = () =>{
    //remove tokens
    navigate("/");
  }

  const getCurrentPageLabel = () => {
    const current = menuItems.find((item) => location.pathname.includes(item.path));
    return current ? current.label.split(" ").slice(1).join(" ") : "Bảng điều khiển";
  };

  return (
    <div className={`admin-container ${darkMode ? "dark" : "light"}`}>
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="logo" onClick={() => setSidebarOpen((prev) => !prev)}>
          {sidebarOpen ? "Admin" : "A"}
        </div>
        <nav className="menu">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.key}
              className={`menu-item ${location.pathname.startsWith(item.path) ? "active" : ""}`}
            >
              <span className="icon">{item.label.split(" ")[0]}</span>
              {sidebarOpen && <span className="label">{item.label.split(" ").slice(1).join(" ")}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <button className="toggle-btn" onClick={() => setSidebarOpen((prev) => !prev)}>
            ☰
          </button>
          <h1>{getCurrentPageLabel()}</h1>
          <div className="header-actions">
            <input type="text" placeholder="Tìm kiếm..." className="search-input" />
            <button className="theme-toggle" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? "🌙" : "☀️"}
            </button>
            <button className="logout-btn" onClick={handerLogout}>🚪 Đăng xuất</button>
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}