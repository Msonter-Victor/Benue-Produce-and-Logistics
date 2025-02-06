import Footer from "../footer/index";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "../header/Header";

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <main className="layout-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
