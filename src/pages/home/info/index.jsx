import shippingIcon from "./../../../images/freeshipping.png"
import supportIcon from "./../../../images/support.png"
import paymentIcon from "./../../../images/payment.png"
import guaranteeIcon from "./../../../images/guarantee.png"
import style from "./index.module.css"

const features = [
    {
        icon: shippingIcon,
        title: "Free Shipping",
        description: "Free shipping with discount",
    },
    {
        icon: supportIcon,
        title: "Great Support 24/7",
        description: "Instant access to Contact",
    },
    {
        icon: paymentIcon,
        title: "100% Secure Payment",
        description: "We ensure your money is safe",
    },
    {
        icon: guaranteeIcon,
        title: "Money-Back Guarantee",
        description: "30 days money-back",
    },
];

const InfoSection = () => {
    return (
        <div className={style.features_container}>
            {features.map((feature, index) => (
                <div className={style.feature_card} key={index}>
                    <img src={feature.icon} alt={feature.title} className={style.feature_icon} />
                    <h3 className={style.feature_title}>{feature.title}</h3>
                    <p className={style.feature_description}>{feature.description}</p>
                </div>
            ))}
        </div>
    );
}

export default InfoSection