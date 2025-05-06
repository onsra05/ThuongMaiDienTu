import React, { useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineAppstore,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./style.scss";

const Dashboard = () => {
  const stats = [
    { title: "Đơn hàng", value: 1280, icon: <AiOutlineShoppingCart className="icon icon-blue" /> },
    { title: "Khách hàng", value: 540, icon: <AiOutlineUser className="icon icon-green" /> },
    { title: "Sản phẩm", value: 320, icon: <AiOutlineAppstore className="icon icon-yellow" /> },
    { title: "Doanh thu", value: "₫420,000,000", icon: <AiOutlineDollarCircle className="icon icon-red" /> },
  ];

  const [revenueData, setRevenueData] = useState([]);
  const [statsData, setStatsData] = useState({ orders: 0, customers: 0, products: 0, revenue: 0 });

  useEffect(() => {
    // Giả lập gọi API để lấy dữ liệu thống kê
    const fetchStatsData = async () => {
      // Giả lập gọi API cho các thông tin thống kê
      setStatsData({
        orders: 1500,
        customers: 600,
        products: 350,
        revenue: 500000000, // Doanh thu
      });
    };

    fetchStatsData();

    // Giả lập gọi API để lấy dữ liệu doanh thu 6 tháng gần nhất
    const data = [
      { name: "Th9", value: 25000000 },
      { name: "Th10", value: 28000000 },
      { name: "Th11", value: 30000000 },
      { name: "Th12", value: 32000000 },
      { name: "Th1", value: 27000000 },
      { name: "Th2", value: 29000000 },
    ];
    setRevenueData(data);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Bảng điều khiển</h2>

      {/* Thống kê nhanh */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card">
            <div>
              <h3 className="stat-title">{item.title}</h3>
              <p className="stat-value">{item.title === "Doanh thu" ? `₫${statsData.revenue.toLocaleString()}` : item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Biểu đồ cột doanh thu */}
      <div className="revenue-chart">
        <h3 className="chart-title">Tỷ lệ doanh thu 6 tháng gần nhất</h3>
        <div className="bar-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₫${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
