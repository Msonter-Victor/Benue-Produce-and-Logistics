import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Sidebar from "./../sider/index";
import style from "./index.module.css";
import UserHeader from "../dashboardHeader/index";

const UserDashboard = () => {
    const [headerTitle, setHeaderTitle] = useState("Overview");

    return (
        <Router>
            <div className={style.dashboard_container}>
                <Sidebar onSelect={setHeaderTitle} />
                <div className={style.main_content}>
                    <UserHeader title={headerTitle} />
                    <div className={style.content_area}>
                        <h2>Overview</h2>
                        <p>Detailed information about your store.</p>
                        <div className={style.stats_container}>
                            <div className={style.stat_card}>Sales: <span>$1,234.00</span></div>
                            <div className={style.stat_card}>Total Revenue: <span>$10,566.01</span></div>
                            <div className={style.stat_card}>Return: <span>$956.00</span></div>
                            <div className={style.stat_card}>Marketing: <span>$5,566.01</span></div>
                        </div>
                        <div className={style.chart_container}>
                            <h3>Overall Revenue</h3>
                            <p>$48,574.21</p>
                            <div className={style.chart_placeholder}>[Chart Placeholder]</div>
                        </div>
                        <div className="best-selling">
                            <h3>Best Selling</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Brand</th>
                                    <th>Stock</th>
                                    <th>Sales</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Watch Nike Series 7</td>
                                    <td>Apple</td>
                                    <td>100</td>
                                    <td>1,234</td>
                                    <td>$399.00</td>
                                </tr>
                                <tr>
                                    <td>iPhone 13 Pro</td>
                                    <td>Apple</td>
                                    <td>2</td>
                                    <td>500</td>
                                    <td>$2,999.00</td>
                                </tr>
                                <tr>
                                    <td>iPhone 12 Mini</td>
                                    <td>Apple</td>
                                    <td>110</td>
                                    <td>789</td>
                                    <td>$2,599.00</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default UserDashboard;
