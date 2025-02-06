import arrow from "./../../../images/green arrow.png"
import style from './index.module.css'
import apple from './../../../images/apple.png'
import cabbage from './../../../images/cabbage.png'
import capiscum from './../../../images/capiscum.png'
import finger from './../../../images/finger.png'

const products = [
    {
        id: 1,
        name: "Green Apple",
        price: 199,
        image: apple,
        rating: 4,
        locked: true,
    },
    {
        id: 2,
        name: "Chanise Cabbage",
        price: 149,
        image: cabbage,
        rating: 4,
        locked: true,
    },
    {
        id: 3,
        name: "Green Capsicum",
        price: 14.99,
        image: capiscum,
        rating: 5,
        locked: false,
    },
    {
        id: 4,
        name: "Ladies Finger",
        price: 14.99,
        image: finger,
        rating: 4,
        locked: false,
    },
];

const FeaturedSection = ()=>{
    return (
        <div className={style.container}>
            <div className={style.textSection}>
                <h2>Featured Products</h2>
                <p>View all<img src={arrow} alt="image"/></p>
            </div>
            <div className={style.products_container}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={style.product_card}
                    >
                        <div className={style.product}>
                            <img src={product.image} alt={product.name} className={style.product_image} />

                            <h3>{product.name}</h3>
                            <p className="price">${product.price.toFixed(2)}</p>

                            <div className={style.rating}>
                                {"★".repeat(product.rating)}{" "}
                                {"☆".repeat(5 - product.rating)}
                            </div>

                            <div className={style.icon}>
                                {product.locked ? (
                                    <span role="img" aria-label="lock">🔒</span>
                                ) : (
                                    <span role="img" aria-label="cart">🛒</span>
                                )}
                            </div>
                        </div>
                        </div>

                ))}
            </div>
        </div>


    )
}

export default FeaturedSection;