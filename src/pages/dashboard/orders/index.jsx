import { useState } from "react";
import styles from "./index.module.css";
import filterImg from './../../../images/filter.png'
import exportImg from './../../../images/exports.png'

const ordersData = [
    { id: "SKN1200", product: "Watch Nike Series 7", customer: "Robert Fox", date: "01.01.2022", status: "Continuing", price: "$399.00" },
    { id: "SKN1233", product: "iPhone 13 Pro", customer: "Brooklyn Simmons", date: "01.01.2022", status: "Continuing", price: "$2,999.00" },
    { id: "KBN1243", product: "iPhone 12 Mini", customer: "Jacob Jones", date: "01.01.2022", status: "Continuing", price: "$2,599.00" },
    { id: "APG3468", product: "AirPods 3 Generation", customer: "Marvin McKinney", date: "01.01.2022", status: "Completed", price: "$179.00" },
    { id: "SAG2456", product: "Galaxy Z Flip 5G", customer: "Bessie Cooper", date: "01.01.2022", status: "Canceled", price: "$399.00" },
    { id: "SGA3258", product: "Samsung Galaxy A52 5G", customer: "Arlene McCoy", date: "01.01.2022", status: "Continuing", price: "$399.00" },
    { id: "SQA1342", product: "MacBook Pro 14-inch", customer: "Ralph Edwards", date: "01.01.2022", status: "Continuing", price: "$2,499.00" },
    { id: "SGA1342", product: "MacBook Air 13-inch", customer: "Dianne Russell", date: "01.01.2022", status: "Completed", price: "$1,249.00" },
    { id: "SKN4567", product: "iPhone 13 Pro Max", customer: "Esther Howard", date: "01.01.2022", status: "Completed", price: "$1,599.00" },
    { id: "KBN7980", product: "Silver Aluminum Case", customer: "Darrell Steward", date: "01.01.2022", status: "Completed", price: "$279.00" },
];

const Orders = () => {
    const [activeTab, setActiveTab] = useState("All Orders");

    const filteredOrders = activeTab === "All Orders"
        ? ordersData
        : ordersData.filter(order => order.status === activeTab);

    return (
        <div className={styles.ordersContainer}>
            <div className={styles.tabs}>
                <div>
                    {["All Orders", "Continuing", "Completed", "Canceled"].map(tab => (
                        <button
                            key={tab}
                            className={activeTab === tab ? styles.activeTab : ""}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={styles.actions}>
                    <div className={styles.actionSec}>
                        <img src={filterImg} alt="Filter" />
                        <p>Filters</p>
                    </div>
                    <div className={styles.actionSec}>
                        <img src={exportImg} alt="Filter" />
                        <p>Export</p>
                    </div>
                </div>
            </div>


            <table className={styles.ordersTable}>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td className={styles[order.status.toLowerCase()]}>{order.status}</td>
                        <td>{order.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <span>Show rows:</span>
                <select>
                    <option>10 rows</option>
                    <option>20 rows</option>
                </select>
                <div className={styles.pageNumbers}>
                    <button>&lt;</button>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <button>&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
