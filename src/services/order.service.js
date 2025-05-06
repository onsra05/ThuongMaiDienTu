import axios from 'axios';


// thanh toan don hang
export const createOrder = async (email, orderData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders/${email}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error creating order for user with email ${email}:`, error);
    throw error;
  }
};


// 
export const fetchOrdersByEmail = (email) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/orders/user/${email}`)
      .then(res => res.data)
      .catch(error => {
          console.error("Error fetching orders", error);
          throw error;
      });
};

// Fetch danh sách đơn hàng
export const fetchOrdersService = async (page, searchEmail, filterStatus, sortOrder) => {
  try {
    let res;
    if (searchEmail.trim()) {
      res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/user/${searchEmail}`);
      const filtered = [res.data].filter((order) =>
        filterStatus === "all" ? true : order.status === Number(filterStatus)
      );
      return { orders: filtered, totalPages: 1 };
    } else {
      res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?page=${page}&size=5`);
      let filtered = res.data.content || [];

      // Lọc theo status
      if (filterStatus !== "all") {
        filtered = filtered.filter((order) => order.status === Number(filterStatus));
      }

      // Sắp xếp theo ngày
      filtered.sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });

      return { orders: filtered, totalPages: res.data.totalPages || 1 };
    }
  } catch (err) {
    console.error("Lỗi khi tải đơn hàng:", err);
    return { orders: [], totalPages: 1 };
  }
};

// Lấy chi tiết đơn hàng
export const fetchOrderDetailsService = async (orderId) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderDetail/order/${orderId}`);
    return res.data; // trả về danh sách chi tiết sản phẩm
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatusService = async (orderId, newStatus) => {
  try {
    let url = "";
    if (newStatus === "1") url = `/orders/deliver/${orderId}`;
    else if (newStatus === "2") url = `/orders/success/${orderId}`;
    else if (newStatus === "-1") url = `/orders/cancel/${orderId}`;
    else return; // giữ nguyên nếu chọn lại "Đang xử lý"

    await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    return true;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    throw error;
  }
};