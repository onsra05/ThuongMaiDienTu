
import { ROUTERS } from "./utils/router";
import PageHome from "./pages/users/pageHome";
import { Route, Routes } from "react-router-dom";
import Master from "./pages/users/theme/master";
import DetailProduct from "./pages/users/detailProduct";
import Login from "./pages/users/login";
import ShoppingCart from "./pages/users/shoppingCart";
import Customers from "./pages/admin/customers";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./pages/admin/orders";
import Products from "./pages/admin/products";
import AdminLayout from "./pages/admin/adminLayout";
import Reports from "./pages/admin/reports";
const renderUserRouter = () => {

    const userRouter = [{
        path: ROUTERS.USER.HOME,
        component: <PageHome />
    },{
        path: ROUTERS.USER.DETAILS,
        component: <DetailProduct />
    },{
        path: ROUTERS.USER.LOGIN,
        component: <Login />
    },{
        path: ROUTERS.USER.SHOPPINGCART,
        component: <ShoppingCart />
    },
    
    
    
    {
        path: ROUTERS.ADMIN.DASHBOARD,
        component: <Dashboard />
    }
    ,{
        path: ROUTERS.ADMIN.CUSTOMERS,
        component: <Customers />
    },{
        path: ROUTERS.ADMIN.ORDERS,
        component: <Orders />
    },{
        path: ROUTERS.ADMIN.PRODUCTS,
        component: <Products />
    }
    ,{
        path: ROUTERS.ADMIN.ADMINLAYOUT,
        component: <AdminLayout />
    },{
        path: ROUTERS.ADMIN.REPORTS,
        component: <Reports />
    }
]
    return <Master>
        <Routes>
            {userRouter.map((item, key) => (<Route key={key} path={item.path} element={item.component} />))}
        </Routes>
    </Master>
}



const RouterCustom = () => {
    return renderUserRouter();

}



export default RouterCustom;