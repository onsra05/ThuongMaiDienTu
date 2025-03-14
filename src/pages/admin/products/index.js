import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const categoryList = [
  { categoryId: 1, categoryName: "Điện thoại" },
  { categoryId: 2, categoryName: "Laptop" },
  { categoryId: 3, categoryName: "Điện gia dụng" },
  { categoryId: 4, categoryName: "Đồng hồ" },
  { categoryId: 5, categoryName: "Tivi" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    productId: "",
    name: "",
    quantity: "",
    price: "",
    discount: "",
    image: "",
    description: "",
    enteredDate: new Date().toISOString().split("T")[0],
    status: true,
    sold: 0,
    category: { categoryId: "", categoryName: "" },
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page]); // Gọi API khi `page` thay đổi

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?page=${page}&size=${size}`);
      setProducts(response.data.content); // Dữ liệu sản phẩm từ API
      setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categoryList.find(c => c.categoryId === parseInt(e.target.value));
    setForm({ ...form, category: selectedCategory });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newProductId = form.productId;
    if (!newProductId) {
      const maxId = products.length > 0 ? Math.max(...products.map(p => p.productId)) : 0;
      newProductId = maxId + 1;
    }

    if (!form.category || !form.category.categoryId) {
      alert("Vui lòng chọn danh mục hợp lệ!");
      return;
    }

    const productData = {
      ...form,
      productId: newProductId,
      category: { categoryId: form.category.categoryId },
    };

    try {
      if (form.productId) {
        await axios.put(`http://localhost:8080/api/products/${form.productId}`, productData);
      } else {
        await axios.post("http://localhost:8080/api/products", productData);
      }
      setShowPopup(false);
      setForm({
        productId: "",
        name: "",
        quantity: "",
        price: "",
        discount: "",
        image: "",
        description: "",
        enteredDate: new Date().toISOString().split("T")[0],
        status: true,
        sold: 0,
        category: { categoryId: "", categoryName: "" },
      });
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="products-page">
      <button onClick={() => setShowPopup(true)}>Thêm sản phẩm</button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{form.productId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required />
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Số lượng" required />
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Giá" required />
              <input type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Giảm giá (%)" />
              <input type="date" name="enteredDate" value={form.enteredDate} onChange={handleChange} />
              <select value={form.category.categoryId || ""} onChange={handleCategoryChange} required>
                <option value="">Chọn danh mục</option>
                {categoryList.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <input type="file" onChange={handleImageChange} accept="image/*" />
              <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Hoặc nhập URL hình ảnh" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" required />
              <button type="submit">{form.productId ? "Cập nhật" : "Thêm"}</button>
              <button type="button" onClick={() => setShowPopup(false)}>Đóng</button>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Giảm giá</th>
              <th>Ngày nhập</th>
              <th>Danh mục</th>
              <th>Hình ảnh</th>
              <th>Đã bán</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.productId}>
                <td>{index + 1 + page * size}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.discount}%</td>
                <td>{product.enteredDate}</td>
                <td>{product.category.categoryName}</td>
                <td><img src={product.image} alt={product.name} width="50" /></td>
                <td>{product.sold}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Sửa</button>
                  <button onClick={() => handleDelete(product.productId)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(0)} disabled={page === 0}>Trang đầu</button>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Trước</button>
        <span>Trang {page + 1} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>Tiếp</button>
        <button onClick={() => handlePageChange(totalPages - 1)} disabled={page >= totalPages - 1}>Trang cuối</button>
      </div>
    </div>
  );
};

export default Products;
