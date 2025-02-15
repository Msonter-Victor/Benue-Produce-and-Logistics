import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import style from "./index.module.css";

const userActivityData = {
    "This Week": [
        { day: "S", users: 500 },
        { day: "M", users: 800 },
        { day: "T", users: 1200 },
        { day: "W", users: 1500 },
        { day: "T", users: 1100 },
        { day: "F", users: 1000 },
        { day: "S", users: 900 },
    ],
    "Last Week": [
        { day: "S", users: 600 },
        { day: "M", users: 900 },
        { day: "T", users: 1300 },
        { day: "W", users: 1400 },
        { day: "T", users: 1000 },
        { day: "F", users: 950 },
        { day: "S", users: 850 },
    ],
    "Two Weeks Ago": [
        { day: "S", users: 550 },
        { day: "M", users: 850 },
        { day: "T", users: 1250 },
        { day: "W", users: 1350 },
        { day: "T", users: 1050 },
        { day: "F", users: 970 },
        { day: "S", users: 880 },
    ],
};

const formatYAxis = (tick) => `${tick / 1000}k`;

const UserActivityChart = () => {
    const [selectedWeek, setSelectedWeek] = useState("This Week");

    return (
        <div style={{ width: "100%", height: "280px", backgroundColor: "#fff", borderRadius: "10px", padding: "10px" }}>

            <div style={{display: "flex",justifyContent: "space-between", alignItems: "center"}}>
                <div className={style.activityTop}>
                    <h2>User Activity</h2>
                    <h2>10,320 <span className={style.percentage}>-20%</span></h2>
                </div>
                <select className={style.weekSelect} value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                    {Object.keys(userActivityData).map((week) => (
                        <option key={week} value={week}>{week}</option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={userActivityData[selectedWeek]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip formatter={(value) => `${value} users`} />
                    <Bar
                        dataKey="users"
                        barSize={20}
                        radius={[10, 10, 0, 0]}
                        fill="blue"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserActivityChart;
