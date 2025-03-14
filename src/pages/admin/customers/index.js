import React, { useEffect, useState } from "react";
import "./style.scss";
import { deleteCustomer, fetchCustomers } from "../../../services/customer.service";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    // Gọi service để lấy danh sách khách hàng
    const loadCustomers = async () => {
      try {
        const { customers, totalPages } = await fetchCustomers(page, pageSize);
        setCustomers(customers);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    };
    loadCustomers();
  }, [page]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    try {
      await deleteCustomer(userId); // Gọi service để xóa người dùng
      // Sau khi xóa, reload danh sách khách hàng
      const { customers, totalPages } = await fetchCustomers(page, pageSize);
      setCustomers(customers);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <div className="customers-page">
      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.userId}>
                <td>{index + 1 /* + page * pageSize */}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button onClick={() => handleDelete(customer.userId)} className="delete-btn">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          &laquo; Trước
        </button>
        <span>Trang {page + 1} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
          Sau &raquo;
        </button>
      </div>
    </div>
  );
};

export default Customers;
