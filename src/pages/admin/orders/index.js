import React from "react";
import "./style.scss";

const Orders = () => {
  const orders = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0123456789",
      orderDate: "2025-02-15",
      status: "Đã giao",
      total: "1.200.000₫",
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      email: "b@example.com",
      phone: "0987654321",
      orderDate: "2025-02-17",
      status: "Đang xử lý",
      total: "850.000₫",
    },
    {
      id: 3,
      customerName: "Lê Văn C",
      email: "c@example.com",
      phone: "0912345678",
      orderDate: "2025-02-18",
      status: "Đang vận chuyển",
      total: "2.450.000₫",
    },
  ];

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <div className="orders-page">
      <h2 className="title">Quản lý đơn hàng</h2>

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.orderDate}</td>
                <td>
                  <span
                    className={`status-badge ${
                      order.status === "Đã giao"
                        ? "delivered"
                        : order.status === "Đang xử lý"
                        ? "processing"
                        : "shipping"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;