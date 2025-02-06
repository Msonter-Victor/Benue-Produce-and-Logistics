import Home from "../pages/home/index";
import SignUp from "../pages/signup";
import Login from "../pages/login/Index";
import Layout from "../components/layout/Layout";
import DashBoard from "../pages/dashboard";


export const ROUTES = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element:<Home/>
            },
            {
                path: "home",
                element: <Home/>
            },
            //  {
            //      path: "dashboard",
            //     element: <DashBoard/>
            // },
            // {
            //     path: "contact",
            //     element: <ContactUs/>
            // },
            // {
            //     path: "properties",
            //     element: <Properties/>
            // },
            // {
            //     path:"/property/:id",
            //     element: <PropertyDetails/>
            // },
            // {
            //     path: "/apartment/:id",
            //     element: <ApartmentDetails/>
            // },
            // {
            //     path: "/apartments",
            //     element: <ApartmentLists/>
            // },
            // {
            //     path: "/pay/:id",
            //     element: <Payment/>
            // },
            // {
            //     path: "/dashboard",
            //     element: <Dashboard/>
            // },
            // {
            //     path: "/property/:id/apartments/add",
            //     element: <AddApartment/>
            // },
            // {
            //     path: "/dashboard/properties",
            //     element: <LandlordProperties/>
            // },
            // {
            //     path: "/dashboard/property/:id",
            //     element: <LandlordPropertyDetails/>
            // },
            // {
            //     path: "/dashboard/apartment/:id",
            //     element: <LandlordApartmentDetails/>
            // },
            // {
            //     path: "/verify-payment/:apartmentId",
            //     element: <VerifyPaymentPage/>
            // },
            // {
            //     path: "/apartment-info",
            //     element: <ApartmentInfo/>
            // },
            // {
            //     path: "/landlord-details",
            //     element: <LandlordDetails/>
            // }
        ]
    },
    {path: "signup", element: <SignUp/>},
    {path: "login", element: <Login/>},
    {path: "dashboard", element: <DashBoard/>}
]