import { Link } from "react-router-dom";
import StarRating from "../../../components/starRating";
import './productcard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
                <img src={product.imageUrls[0]} alt={product.type} className="product-image" />
                <div className="product-info">
                    <h3 className="product-name">{product.productName}</h3>
                    <div className="product-stock">
                        <span>Stock: {product.stock}</span>
                    </div>
                    <div className="product-price">Unit Price: ₦{product.price}</div>
                    <StarRating rating={product.averageRating} />
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
