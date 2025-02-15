import style from "./index.module.css";
import overViewImg from './../../../images/layout-grid.png'
import orderImg from './../../../images/shopping-cart-discount.png'
import productImg from './../../../images/Group.png'
import logoutImg from './../../../images/logout icon.png'
import profileImg from './../../../images/Group (1).png'
import dashboardImg from './../../../images/benue logo.png'

const DashBoardSider = () => {
    return (
        <aside className={style.sidebar}>
            <div className={style.dashboardHeader}>
                <img src={dashboardImg} alt="Dashboard Icon" className={style.dashboardIcon} />
            </div>
            <h2>Dashboard</h2>
            <nav className={style.nav_links}>
                <div className={style.sideImgSection}>
                    <img src={overViewImg} alt="img"/>
                    <a href="/dashboard">Overview</a>
                </div>
                <div className={style.sideImgSection}>
                    <img src={orderImg} alt="img"/>
                    <a href="/dashboard/orders">Orders</a>
                </div>
                <div className={style.sideImgSection}>
                    <img src={productImg} alt="img"/>
                    <a href="/dashboard/products">Products</a>
                </div>
                <div className={style.sideImgSection}>
                    <img src={profileImg} alt="img"/>
                    <a href="/dashboard/profile">Profile</a>
                </div>
            </nav>
            <div className={style.logoutSection}>
                <img src={logoutImg} alt="img"/>
                <p>Log out</p>
            </div>
        </aside>
    )
}

export default DashBoardSider;