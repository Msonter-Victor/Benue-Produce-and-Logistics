import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Row, Col, Progress, Table } from 'antd';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import style from './index.module.css';
import default_photo from './../../images/default head shot.jpg'

const { Header, Sider, Content } = Layout;
const revenueData = [
    { month: 'Jan', value: 30 },
    { month: 'Feb', value: 60 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 120 },
    { month: 'May', value: 150 },
    { month: 'Jun', value: 120 },
    { month: 'Jul', value: 90 },
    { month: 'Aug', value: 60 },
    { month: 'Sep', value: 30 },
    { month: 'Oct', value: 60 },
    { month: 'Nov', value: 90 },
    { month: 'Dec', value: 120 },
];

const StatsCard = ({ title, value, percentage }) => (
    <Card className={style.stats_card}>
        <h3>{title}</h3>
        <div className={style.stats_content}>
            <h2>{value}</h2>
            <span style={{ color: '#52c41a' }}>{percentage}</span>
        </div>
    </Card>
);

const DashBoard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage (assuming it was set after login)
        const storedUser = localStorage.getItem('user');
        // console.log("user "+storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Layout style={{ minHeight: '50vh' }}>
            <Sider theme="light">
                <div className={style.logo} />
                <Menu theme="light" mode="inline" style={{ backgroundColor: '#fff' }}>
                    <Menu.Item style={{ color: 'green' }} key="1">Dashboard</Menu.Item>
                    <Menu.Item style={{ color: 'green' }} key="3">Products</Menu.Item>
                    <Menu.Item style={{ color: 'green' }} key="4">Sales</Menu.Item>
                    <Menu.Item style={{ color: 'green' }} key="6">Profile</Menu.Item>
                    <Menu.Item style={{ color: 'green' }} key="7">Add product</Menu.Item>
                </Menu>
            </Sider>

            <Layout className={style.site_layout}>
                <Header className={style.site_layout_header}>
                    <div className={style.profile_header}>
                        <div className={style.greeting}>
                            <h1>Hello, {user.firstName}</h1>
                            <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
                                <p>{moment().format('dddd, Do MMMM YYYY')}</p>
                                <img src={default_photo} alt="User Profile" />
                            </div>
                        </div>
                    </div>
                </Header>

                <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5' }}>
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <StatsCard title="Total orders" value="36,778" percentage="+5.21%" />
                        </Col>
                        <Col span={12}>
                            <StatsCard title="Total Earnings" value="$96,778" percentage="+3.89%" />
                        </Col>
                    </Row>

                    <Card title="Revenue" style={{ marginTop: 24 }}>
                        <BarChart width={900} height={300} data={revenueData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Bar dataKey="value" fill="#1da57a" />
                        </BarChart>
                    </Card>

                    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                        <Col span={8}>
                            <Card>
                                <h2>$6,012</h2>
                                <p>Orders</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <h2>$2,47,901</h2>
                                <p>Earnings</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <h2>18.92%</h2>
                                <p>Conversion Ratio</p>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                        <Col span={12}>
                            <Card title="Recent orders">
                                <Table
                                    columns={[
                                        { title: 'Order', dataIndex: 'order' },
                                        { title: 'Products', dataIndex: 'products' },
                                        { title: 'Operations', dataIndex: 'operations' },
                                    ]}
                                    dataSource={[]}
                                    pagination={false}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Sales by location" extra={<a href="#">Go Report</a>}>
                                <Progress percent={70} status="active" />
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashBoard;
