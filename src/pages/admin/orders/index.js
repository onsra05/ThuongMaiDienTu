import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchEmail, setSearchEmail] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const formatPrice = (price) => {
    if (price == null || isNaN(price)) {
      return 'N/A';
    }
    return price.toLocaleString('vi-VN');
  };


  const fetchOrders = async () => {
    try {
      setLoading(true);
      let res;

      if (searchEmail.trim()) {
        res = await axios.get(
          `http://localhost:8080/api/orders/user/${searchEmail}`
        );
        const filtered = [res.data].filter((order) =>
          filterStatus === "all" ? true : order.status === Number(filterStatus)
        );
        setOrders(filtered);
        setTotalPages(1);
      } else {
        res = await axios.get(`http://localhost:8080/api/orders?page=${page}&size=5`);

        let filtered = res.data.content || [];

        // lọc theo status
        if (filterStatus !== "all") {
          filtered = filtered.filter(
            (order) => order.status === Number(filterStatus)
          );
        }

        // sắp xếp theo ngày
        filtered.sort((a, b) => {
          const dateA = new Date(a.orderDate);
          const dateB = new Date(b.orderDate);
          return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

        setOrders(filtered);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, searchEmail, filterStatus, sortOrder]);

  const handleViewDetails = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orderDetail/order/${orderId}`);
      setOrderDetails(res.data); // danh sách chi tiết sản phẩm
      setSelectedOrder(orderId);
      setShowModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };


  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return "Đang xử lý";
      case 1:
        return "Đang vận chuyển";
      case 2:
        return "Đã giao";
      default:
        return "Không xác định";
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      let url = "";
      if (newStatus === "1") url = `/api/orders/deliver/${orderId}`;
      else if (newStatus === "2") url = `/api/orders/success/${orderId}`;
      else if (newStatus === "-1") url = `/api/orders/cancel/${orderId}`;
      else return; // giữ nguyên nếu chọn lại "Đang xử lý"

      await axios.get(`http://localhost:8080${url}`);
      alert("Cập nhật trạng thái thành công!");
      fetchOrders(); // reload lại đơn hàng
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  };

  return (
    <div className="orders-page">
      <h2 className="title">Quản lý đơn hàng</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm theo email..."
          value={searchEmail}
          onChange={(e) => {
            setSearchEmail(e.target.value);
            setPage(0);
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(0);
          }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="0">Đang xử lý</option>
          <option value="1">Đang vận chuyển</option>
          <option value="2">Đã giao</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Mới nhất</option>
          <option value="asc">Cũ nhất</option>
        </select>
        <button onClick={() => setSearchEmail("")}>Xóa tìm</button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
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
                <th>Chi tiết</th>
                <th>Hành động</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.ordersId}>
                  <td>{index + 1}</td>
                  <td>{order.user?.name}</td>
                  <td>{order.user?.email}</td>
                  <td>{order.user?.phone}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`status-badge ${order.status === 2
                        ? "delivered"
                        : order.status === 0
                          ? "processing"
                          : "shipping"
                        }`}
                    >
                      {renderStatus(order.status)}
                    </span>
                  </td>
                  <td>{order.amount.toLocaleString()} ₫</td>
                  <td>
                    <button onClick={() => handleViewDetails(order.ordersId)}>Xem chi tiết</button>
                  </td>

                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleChangeStatus(order.ordersId, e.target.value)}
                    >
                      <option value="0">Đang xử lý</option>
                      <option value="1">Đang vận chuyển</option>
                      <option value="2">Đã giao</option>
                      <option value="-1">Hủy đơn</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          {!searchEmail && (
            <div className="pagination">
              <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
                ← Trước
              </button>
              <span>
                Trang {page + 1} / {totalPages}
              </span>
              <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1}>
                Tiếp →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal chi tiết đơn */}
      {showModal && (
        <div className="modal-overlay">
          <div className="order-detail-modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

            <h3>Chi tiết đơn hàng #{selectedOrder}</h3>

            <div className="order-info">
              {orderDetails.length > 0 && orderDetails[0]?.order?.user ? (
                <>
                
                  <p><strong>Người mua:</strong> {orderDetails[0]?.order?.user?.name}</p>
                  <p><strong>Email:</strong> {orderDetails[0]?.order?.user?.email}</p>
                  <p><strong>SĐT:</strong> {orderDetails[0]?.order?.phone}</p>
                  <p><strong>Ngày đặt:</strong> {new Date(orderDetails[0]?.order?.orderDate).toLocaleDateString()}</p>
                  <p><strong>Trạng thái:</strong> {renderStatus(orderDetails[0]?.order?.status)}</p>
                </>
              ) : (
                <p>Đang tải dữ liệu...</p>  // Thông báo khi không có dữ liệu
              )}
            </div>

            <div className="product-list">
              <table>
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>SL</th>
                    <th>Tổng phụ</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.product?.image} alt={item.product?.name} /></td>
                      <td>{item.product?.name}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Orders;
