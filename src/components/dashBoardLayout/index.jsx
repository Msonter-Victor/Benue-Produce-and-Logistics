import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from "./index.module.css";
import bell from "./../../images/bell.png";
import DashBoardSider from "./sider";
import defaultImg from "./../../images/default head shot.jpg";

const DashboardLayout = () => {
    const location = useLocation();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const profileImage = storedUser?.mediaUrl || defaultImg;
    console.log("meida link: "+storedUser?.mediaUrl)



    const pageInfo = {
        "/dashboard": { title: "Overview", description: "Detailed information about your store" },
        "/dashboard/orders": { title: "Orders", description: "Manage and track customer orders" },
        "/dashboard/products": { title: "Products", description: "Manage and view your product inventory" },
        "/dashboard/profile": { title: "Profile", description: "Manage and view your profile" },
    };

    const currentPage = pageInfo[location.pathname] || pageInfo["/dashboard"];

    return (
        <div className={style.dashboard_container}>
            <DashBoardSider />
            <div className={style.main_content}>
                <header className={style.header}>
                    <div className={style.firstHeaderTexts}>
                        <h3>{currentPage.title}</h3>
                        <p>{currentPage.description}</p>
                    </div>

                    <div className={style.user_info}>
                        <input placeholder="Search anything..." />
                        <img src={bell} alt="bell" />
                        <img
                            src={profileImage} // Use profileImage from local storage or default image
                            alt="User"
                            className={style.user_image}
                        />
                    </div>
                </header>

                <main className={style.content_area}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;