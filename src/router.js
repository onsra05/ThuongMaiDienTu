
import { ROUTERS } from "./utils/router";
import PageHome from "./pages/users/pageHome";
import { Route, Routes, Navigate } from "react-router-dom";
import Master from "./pages/users/theme/master";
import DetailProduct from "./pages/users/detailProduct";
import Login from "./pages/users/login";
import ShoppingCart from "./pages/users/shoppingCart";
import Customers from "./pages/admin/customers";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./pages/admin/orders";
import Products from "./pages/admin/products";
import Reports from "./pages/admin/reports";
import Register from "./pages/users/register";
import withAdminGuard from "./hoc/withAdminGuard";
import AdminLayout from "./pages/admin/adminLayout";

const renderUserRouter = () => {
  const ProtectedAdminLayout = withAdminGuard(AdminLayout);
  const userRouter = [
    { path: ROUTERS.USER.HOME, component: <PageHome /> },
    { path: ROUTERS.USER.DETAILS, component: <DetailProduct /> },
    { path: ROUTERS.USER.LOGIN, component: <Login /> },
    { path: ROUTERS.USER.SHOPPINGCART, component: <ShoppingCart /> },
    { path: ROUTERS.USER.REGISTER, component: <Register /> },
  ];

  return (
    <Master>
      <Routes>
        {userRouter.map((item, key) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
        <Route path="/admin" element={<ProtectedAdminLayout />} >
          <Route path="" element={<Navigate to={ROUTERS.ADMIN.DASHBOARD} replace />} />
          <Route path={ROUTERS.ADMIN.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTERS.ADMIN.PRODUCTS} element={<Products />} />
          <Route path={ROUTERS.ADMIN.ORDERS} element={<Orders />} />
          <Route path={ROUTERS.ADMIN.CUSTOMERS} element={<Customers />} />
          <Route path={ROUTERS.ADMIN.REPORTS} element={<Reports />} />
          <Route
            path="*"
            element={
              <div className="page">
                <h2>404</h2>
                <p>Không tìm thấy trang.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </Master>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
