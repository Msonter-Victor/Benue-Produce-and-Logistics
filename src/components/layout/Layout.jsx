import Footer from "../footer/index";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "../header/Header";

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <div className="content">
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
