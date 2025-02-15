import styles from "./index.module.css";
import goldCart from './../../../images/gold cart.png'
import currency from './../../../images/currency.png'
import returnImg from './../../../images/rollback.png'
import marketingImg from './../../../images/marketing.png'
import OverallRevenueChart from "./revenueChart";
import UserActivityChart from "./userActivityChart";

const Overview = () => {
    return (
        <main className={styles.main_section}>
            <div className={styles.stats_container}>
                <div className={styles.stat_card}>
                    <div className={styles.inner_stat_card}>
                        <img src={goldCart} alt="Gold Cart" />
                        <div className={styles.sales}>
                            <h3>Sales</h3>
                            <div className={styles.figures}>
                                <p className={styles.stat_value}>$1,234.00</p>
                                <span className={styles.stat_change}>+10%</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.stat_card}>
                    <div className={styles.inner_stat_card}>
                        <img src={currency} alt="Gold Cart" />
                        <div className={styles.sales}>
                            <h3>Total Revenue</h3>
                            <div className={styles.figures}>
                                <p className={styles.stat_value}>$10,568.01</p>
                                <span className={styles.stat_change}>+23%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stat_card}>
                    <div className={styles.inner_stat_card}>
                        <img src={returnImg} alt="currency" />
                        <div className={styles.sales}>
                            <h3>Return</h3>
                            <div className={styles.figures}>
                                <p className={styles.stat_value}>$958.00</p>
                                <span className={styles.stat_change}>-5%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stat_card}>
                    <div className={styles.inner_stat_card}>
                        <img src={marketingImg} alt="Gold Cart" />
                        <div className={styles.sales}>
                            <h3>Marketing</h3>
                            <div className={styles.figures}>
                                <p className={styles.stat_value}>$5,668.01</p>
                                <span className={styles.stat_change}>+15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.graph_container}>
                    <OverallRevenueChart/>

            </div>
            {/*<UserActivityChart/>*/}
            <div className={styles.bottom_section}>
                <div className={styles.best_selling}>
                    <h3>Best Selling</h3>
                    <ul>
                        <li>Apple Watch Series 7 - $299.00</li>
                        <li>iPhone 13 Pro - $2,899.00</li>
                        <li>iPhone 12 Mini - $2,089.00</li>
                    </ul>
                </div>

                <div className={styles.transaction_history}>
                    <h3>Transaction History</h3>
                    <ul>
                        <li>Payment from #09109 - $421.00</li>
                        <li>Payment from #09108 - $421.00</li>
                        <li>Payment from #09107 - $421.00</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Overview;
