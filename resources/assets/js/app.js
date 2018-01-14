import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Layout, Menu, Breadcrumb } from 'antd';
import Main from './components/Main';

const { Content, Footer, Header, Sider } = Layout;
const { SubMenu } = Menu;
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.React = React;

window.GetQueryString = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r) return unescape(r[2]); return null;
};


function App() {
    return (
        <Layout>
            <Header style={{ position: 'fixed', width: '100%', zIndex: 8 }}>
                <h3 style={{ color: '#fff' }}>自动组卷系统</h3>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff', position: 'fixed' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title={<p>科目管理</p>}>
                                <Menu.Item>知识点</Menu.Item>
                                <Menu.Item>可视化</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="题目管理">
                                <Menu.Item><a href="#">题目类型</a></Menu.Item>
                                <Menu.Item><a href="questions">有效题目</a></Menu.Item>
                                <Menu.Item><a href="">停用题目</a></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="试卷管理">
                                <Menu.Item key="9">试卷类型</Menu.Item>
                                <Menu.Item key="10">随机组卷</Menu.Item>
                                <Menu.Item key="11">有效试卷</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '5% 50px', minHeight: 280, marginLeft: '200px' }}>
                        <Main />
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
    );
}
ReactDOM.render(<App />, document.getElementById('main'));
