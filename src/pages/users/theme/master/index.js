// import { memo } from "react"
// // import Header from "../header"
// // import Footer from "../footer"
// const Master = ({ children, ...props }) => {
//     return (<div {...props}>
//         {/* <Header /> */}
//         {children}
//         {/* <Footer /> */}
//         </div>

//     );
// }

// export default memo(Master)

import { memo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const Master = ({ children, ...props }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin"); // Nếu URL bắt đầu bằng /admin

  return (
    <div {...props}>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </div>
  );
};

export default memo(Master);
