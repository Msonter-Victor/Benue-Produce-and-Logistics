
import style from "./index.module.css"
import heroImage from "./../../../images/Image.png"
import arrow from "./../../../images/arrow.png"
import whiteArrow from "./../../../images/white_arrow.png"
import {useNavigate} from "react-router-dom";



const Hero = ()=>{
    const navigate = useNavigate(); // Initialize navigate

    function handleShopClick() {
        navigate("/products");
    }
    return <div className={style.container}>
        <div>
            <h4 className={style.welcomeText}>WELCOME TO BENUE PRODUCE AND LOGISTICS.</h4>
            <h1 className={style.freshSection}>Fresh and Healthy<br/>FARM PRODUCTS<span className={style.arrowSection}><img src={arrow} alt="image"/></span></h1>
            <button onClick={handleShopClick} className={style.shopButton}>Shop now<img className={style.buttonArrow} src={whiteArrow} alt="img"/></button>
        </div>
        <div>
            <img className={style.heroImage} src={heroImage} alt={"image"}/>
        </div>
    </div>
}
export default Hero;