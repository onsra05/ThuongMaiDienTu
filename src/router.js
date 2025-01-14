
import { ROUTERS } from "./utils/router";
import PageHome from "./pages/users/pageHome";
import { Route, Routes } from "react-router-dom";
import Master from "./pages/users/theme/master";

const renderUserRouter = () => {

    const userRouter = [{
        path: ROUTERS.USER.HOME,
        component: <PageHome />
    }]
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