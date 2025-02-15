const Sidebar = ({ onSelect }) => {
    return (
        <div className="sidebar">
            <h2>Hiphonic</h2>
            <ul>
                <li onClick={() => onSelect("Overview")}>Overview</li>
                <li onClick={() => onSelect("Analytics")}>Analytics</li>
                <li onClick={() => onSelect("Orders")}>Orders</li>
                <li onClick={() => onSelect("Products")}>Products</li>
                <li onClick={() => onSelect("Customers")}>Customers</li>
            </ul>
        </div>
    );
};

export default Sidebar;