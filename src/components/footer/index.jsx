import style from "./index.module.css";
import footer_image from "./../../images/footer-leaf.png"

const Footer = () => {
    const year = new Date().getFullYear();


    return (
        <div className={style.footer}>
            <div>
                <div className={style.imgSection}>
                    <img src={footer_image} alt="footer image" />
                    <h2>Benue Produce and Logistics</h2>
                </div>
                <div className={style.firstTextSection}>
                    <p>Agricultural Products</p>
                    <p>Logistics and Supply Chain</p>
                    <p>{year}</p>

                </div>
            </div>
            <div className={style.textSection}>
                <div>
                    <h4>My account</h4>
                    <p>My account</p>
                    <p>Order History</p>
                    <p>Shopping cart</p>
                    <p>White List</p>
                </div>
                <div>
                    <h4>Helps</h4>
                    <p>Contact</p>
                    <p>FAQs</p>
                    <p>Terms and Conditions</p>
                    <p>Privacy policy</p>
                </div>
                <div>
                    <h4>Categories</h4>
                    <p>Fruits and vegetables</p>
                    <p>Meat and Fish</p>
                    <p>Bread and bakery</p>
                    <p>Beauty and health</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
