import axios from "axios";

//lay user
export const fetchCustomers = async (page, pageSize) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth?page=${page}&size=${pageSize}`);
    const filteredCustomers = response.data.content.filter(customer =>
      customer.roles.some(role => role.id === 1)
    );
    return {
      customers: filteredCustomers,
      totalPages: response.data.totalPages
    };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    throw error; 
  }
};
//xoa user
export const deleteCustomer = async (userId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/auth/${userId}`);
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    throw error; 
  }
};
