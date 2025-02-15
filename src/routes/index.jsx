import Home from "../pages/home/index";
import SignUp from "../pages/signup";
import Login from "../pages/login/Index";
import Layout from "../components/layout/Layout";
import DashboardLayout from "../components/dashBoardLayout";
import Products from "../pages/dashboard/products/index";
import Orders from "../pages/dashboard/orders/index";
import Overview from "../pages/dashboard/overview/index";
import Profile from "../pages/dashboard/profile";
import AllProducts from "../pages/products";

export const ROUTES = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "home", element: <Home /> },
            { path: "/products", element: <AllProducts/>}
        ]
    },
    { path: "signup", element: <SignUp /> },
    { path: "login", element: <Login /> },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Overview /> },
            { path: "products", element: <Products /> },
            { path: "orders", element: <Orders /> },
            { path: "profile", element: <Profile/>}
        ]
    }
];