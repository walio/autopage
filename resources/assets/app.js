import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import { Layout, Dropdown, Icon, Menu, Modal } from 'antd';
import Main from './js/Main';
import login from './js/Auth/login';
import Paper from './js/Paper/Detail';
import page404 from './404';
import page401 from './401';

const { Content, Footer, Header } = Layout;
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if (!window.location.pathname.endsWith('/view/login') && !window.localStorage.s) {
    window.location = '/view/login';
} else {
    window.axios.defaults.headers.common.Authorization = window.localStorage.s;
}

window.GetQueryString = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r) return unescape(r[2]); return null;
};


function App() {
    const menu = (
        <Menu>
            <Menu.Item>
                <a href="/view/personinfo">个人信息</a>
            </Menu.Item>
            <Menu.Item>
                <a
                    onClick={() => {
                        axios.get('/api/logout').then(() => {
                            localStorage.clear();
                            document.location = '/view/login';
                        }).catch(error => {
                            console.log(error);
                            Modal.error({
                                title: '登出失败',
                                content: '请重新登录',
                            });
                            localStorage.clear();
                            document.location = '/view/login';
                        });
                    }}
                >
                    退出登录
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/view/401" component={page401} />
                <Route path="/view/404" component={page404} />
                <Route path="/view/paperDetail" component={Paper} />
                <Route path="/view">
                    <Layout>
                        <Header style={{ position: 'fixed', width: '100%', zIndex: 8 }}>
                            <span style={{ color: '#fff', float: 'left' }}>自动组卷系统</span>
                            {localStorage.u && (
                                <Dropdown overlay={menu} >
                                    <a className="ant-dropdown-link" href="#" style={{ float: 'right' }}>
                                        {localStorage.u}<Icon type="down" />
                                    </a>
                                </Dropdown>)
                            }
                        </Header>
                        <Content style={{ padding: '0 50px', marginTop: 64 }}>
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/view/login" component={login} />
                                    <Route component={Main} />
                                </Switch>
                            </BrowserRouter>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2016 Created by Ant UED
                        </Footer>
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
ReactDOM.render(<App />, document.getElementById('main'));
