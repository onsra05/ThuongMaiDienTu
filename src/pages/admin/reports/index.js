// Customers.jsx
import React from "react";
import "./style.scss";

const Reports = () => {
  const customers = [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", phone: "0123456789", orders: 5 },
    { id: 2, name: "Trần Thị B", email: "b@example.com", phone: "0987654321", orders: 2 },
    { id: 3, name: "Lê Văn C", email: "c@example.com", phone: "0912345678", orders: 8 },
  ];

  return (
    <div className="customers-page">
      <h2>Khách hàng</h2>
      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Số đơn hàng</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
