import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import style from "./index.module.css";

const yearlyData = {
    2023: [
        { name: "Jan", revenue: 40000 },
        { name: "Feb", revenue: 30000 },
        { name: "Mar", revenue: 50000 },
        { name: "Apr", revenue: 70000 },
        { name: "May", revenue: 60000 },
        { name: "Jun", revenue: 80000 },
        { name: "Jul", revenue: 90000 },
        { name: "Aug", revenue: 85000 },
        { name: "Sep", revenue: 75000 },
        { name: "Oct", revenue: 65000 },
        { name: "Nov", revenue: 70000 },
        { name: "Dec", revenue: 73000 },
    ],
    2024: [
        { name: "Jan", revenue: 50000 },
        { name: "Feb", revenue: 40000 },
        { name: "Mar", revenue: 55000 },
        { name: "Apr", revenue: 75000 },
        { name: "May", revenue: 68000 },
        { name: "Jun", revenue: 82000 },
        { name: "Jul", revenue: 94000 },
        { name: "Aug", revenue: 86000 },
        { name: "Sep", revenue: 77000 },
        { name: "Oct", revenue: 66000 },
        { name: "Nov", revenue: 71000 },
        { name: "Dec", revenue: 75000 },
    ],
};

const OverallRevenueChart = () => {
    const [selectedYear, setSelectedYear] = useState(2023);

    return (
        <div style={{ width: "100%", height: "300px", backgroundColor: "white", borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", padding: "0 15px" }}>
                <div className={style.activityTop}>`
                    <h2>Overall Revenue</h2>
                    <h2>10,320 <span className={style.percentage}>+20%</span></h2>
                </div>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    style={{
                        padding: "3px",
                        fontSize: "12px",
                        borderRadius: "5px",
                        border: "0.5px solid grey",
                        cursor: "pointer",
                    }}
                >
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height="80%" style={{marginTop: "-10px"}} >
                <LineChart data={yearlyData[selectedYear]} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OverallRevenueChart;
