import React, { useEffect } from "react";
import axios from "axios";
import Hero from "./hero/index";
// import FindNewHome from "./FindNewHome";
// import MakeEasy from "./MakeEasy";
// import PropertyGrid from "./PropertyView/PropertyGrid";
import API_BASE_URL from "../../config/ApiConfig";
import Info from "./info";
import InfoSection from "./info";
import FeaturedSection from "./featured";

const Home = () => {
    useEffect(() => {
        const wakeUpBackend = async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/v1/property/all`);
            } catch (error) {
                console.error('Error waking up the backend:', error);
            }
        };

        wakeUpBackend();
    }, []);

    return (
        <div>
            <Hero />
            <InfoSection/>
            <FeaturedSection/>
            {/*<ProductGrid />*/}
            {/*<MakeEasy />*/}
        </div>
    );
};

export default Home;
