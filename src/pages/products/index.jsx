import axios from "axios";
import {useEffect, useState} from "react";
import './products.css'
import Spinner from "../../components/spinner";
import ProductCard from "./productcard";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/v1/product/findAll");
                console.log("data:"+response.data);

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="product-grid-container">
            <div className="location">
                <h1>All Products</h1>
                <p>Explore all available products</p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );

}

export default AllProducts;