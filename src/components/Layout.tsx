
import { Outlet } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import CustomFooter from "./CustomFooter";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CustomFooter />
    </div>
  );
};

export default Layout;
