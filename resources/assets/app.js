import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import { Layout, Dropdown, Icon, Menu, Modal } from 'antd';
import login from './js/Auth/login';
import Paper from './js/Paper/Detail';
import page404 from './js/404';
import page401 from './js/401';
import Questions from './js/Question/Show';
import ModifyQuestion from './js/Question/Edit';
import AddQuestion from './js/Question/Add';
import Examtype from './js/Examtype/Show';
import AddExamtype from './js/Examtype/Add';
import ModifyExamtype from './js/Examtype/Edit';
import AutoPage from './js/Paper/Add';
import Papers from './js/Paper/Show';
import UploadFile from './js/Template/Show';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
if (!window.location.pathname.endsWith('/auth/login') && !window.localStorage.s) {
    window.location = '/auth/login';
} else {
    window.axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.s}`;
}
axios.interceptors.response.use(null, error => {
    if (error.response.status === 401 && error.response.data.message === 'Unauthenticated.') {
        window.location = '/auth/login';
    }
    return Promise.reject(error);
});

window.GetQueryString = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r) return unescape(r[2]); return null;
};

class App extends Component {
    constructor() {
        super();
        this.fetch = url => {
            // todo: cache,especially knows which is rarely changed
            axios.get(url).then(res => {
                this.setState({ data: res.data || true });
            });
        };
    }
    state = {
        data: false,
    };
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="/auth/personinfo">个人信息</a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        onClick={() => {
                            axios.get('/api/logout').then(() => {
                                localStorage.clear();
                                document.location = '/auth/login';
                            }).catch(error => {
                                console.log(error);
                                Modal.error({
                                    title: '登出失败',
                                    content: '请重新登录',
                                });
                                localStorage.clear();
                                document.location = '/auth/login';
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
                    <Route path="/">
                        <Layout>
                            <Layout.Header style={{ position: 'fixed', width: '100%', zIndex: 8 }}>
                                <span style={{ color: '#fff', float: 'left' }}>自动组卷系统</span>
                                {localStorage.u && (
                                    <Dropdown overlay={menu} >
                                        <a className="ant-dropdown-link" href="#" style={{ float: 'right' }}>
                                            {localStorage.u}<Icon type="down" />
                                        </a>
                                    </Dropdown>)
                                }
                            </Layout.Header>
                            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/auth/login" component={login} />
                                        <Route path="/view">
                                            <Fragment>
                                                <Layout style={{ padding: '24px 0', background: '#fff', margin: '50px 0' }}>
                                                    <Layout.Sider width={200} style={{ background: '#fff', position: 'fixed' }}>
                                                        <Menu mode="inline" style={{ height: '100%' }}>
                                                            <Menu.SubMenu key="sub1" title={<p>科目管理</p>}>
                                                                <Menu.Item>知识点</Menu.Item>
                                                                <Menu.Item>可视化</Menu.Item>
                                                            </Menu.SubMenu>
                                                            <Menu.SubMenu key="sub2" title="题目管理">
                                                                <Menu.Item><a href="#">题目类型</a></Menu.Item>
                                                                <Menu.Item><a href="/view/questions">有效题目</a></Menu.Item>
                                                                <Menu.Item><a href="">试题回收站</a></Menu.Item>
                                                            </Menu.SubMenu>
                                                            <Menu.SubMenu key="sub3" title="试卷管理">
                                                                <Menu.Item key="9"><a href="/view/papers">试卷类型</a></Menu.Item>
                                                                <Menu.Item key="10"><a href="/view/autopage">随机组卷</a></Menu.Item>
                                                            </Menu.SubMenu>
                                                        </Menu>
                                                    </Layout.Sider>
                                                    <Layout.Content style={{ padding: '2% 50px', minHeight: 280, marginLeft: '200px' }}>
                                                        <BrowserRouter>
                                                            <Switch>
                                                                <BrowserRouter>
                                                                    <Switch>
                                                                        <Route path="/view/examtypes" component={() => <Examtype {...this.state} fetch={this.fetch} />} />
                                                                        <Route path="/view/addExamtype" component={() => <AddExamtype {...this.state} fetch={this.fetch} />} />
                                                                        <Route path="/view/modifyExamtype" component={() => <ModifyExamtype {...this.state} fetch={this.fetch} />} />
                                                                        <Route path="/view/questions" component={Questions} />
                                                                        <Route path="/view/modifyQuestion" component={ModifyQuestion} />
                                                                        <Route path="/view/addQuestion" component={() => <AddQuestion data={{ stem: '', options: [''], digest: '' }} />} />
                                                                        <Route path="/view/autopage" component={() => <AutoPage {...this.state} fetch={this.fetch} />} />
                                                                        <Route path="/view/papers" component={() => <Papers {...this.state} fetch={this.fetch} />} />
                                                                        <Route path="/view/uploadTemplate" component={() => <UploadFile {...this.state} fetch={this.fetch} />} />
                                                                    </Switch>
                                                                </BrowserRouter>
                                                            </Switch>
                                                        </BrowserRouter>
                                                    </Layout.Content>
                                                </Layout>
                                            </Fragment>
                                        </Route>
                                    </Switch>
                                </BrowserRouter>
                            </Layout.Content>
                            <Layout.Footer style={{ textAlign: 'center' }}>
                                AutoPage ©2018 Created by <a href="https://github.com/walio"> walio </a>
                            </Layout.Footer>
                        </Layout>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('main'));
