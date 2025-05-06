import { useEffect, useState } from "react";
import "./style.scss";
import { fetchOrdersByEmail } from "../../../services/order.service";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = localStorage.getItem("email");

    useEffect(() => {
        if (email) {
            fetchOrdersByEmail(email)
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                });
        }
    }, [email]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
    };

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN") + " đ";
    };

    const renderStatus = (status) => {
        switch (status) {
            case 0: return "Chờ xác nhận";
            case 1: return "Đang giao";
            case 2: return "Đã giao";
            case 3: return "Đã hủy";
            default: return "Không rõ";
        }
    };

    if (loading) return <div className="order-history">Đang tải đơn hàng...</div>;

    return (
        <div className="back">
            <div className="order-history">
            <h2>Đơn hàng của tôi</h2>
            {orders.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Ngày đặt</th>
                            <th>Số tiền</th>
                            <th>Địa chỉ</th>
                            <th>SĐT</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.ordersId}>
                                <td>{order.ordersId}</td>
                                <td>{formatDate(order.orderDate)}</td>
                                <td>{formatPrice(order.amount)}</td>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{renderStatus(order.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default OrderHistory;
