import React, { Component, Fragment } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Questions from './Question/Show';
import ModifyQuestion from './Question/Edit';
import AddQuestion from './Question/Add';
import Examtype from './Examtype/Show';
import AddExamtype from './Examtype/Add';
import ModifyExamtype from './Examtype/Edit';
import AutoPage from './Paper/Add';
import Papers from './Paper/Show';


const { Content, Sider } = Layout;
const { SubMenu } = Menu;
export default class Main extends Component {
    constructor() {
        super();
        this.fetch = url => {
            // todo: cache,especially knows which is rarely changed
            axios.get(url).then(res => {
                this.setState({ data: res.data || true });
            }).catch(error => {
                if (error.response.status === 401) {
                    document.location = '/view/login';
                }
            });
        };
        this.state = {
            data: false,
        };
    }
    render() {
        return (
            <Fragment>
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
                        <BrowserRouter>
                            <Switch>
                                <BrowserRouter>
                                    <Switch>
                                        <Route path="/view/examtypes" component={() => <Examtype {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/addExamtype" component={() => <AddExamtype {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/modifyExamtype" component={() => <ModifyExamtype {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/questions" component={() => <Questions {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/modifyQuestion" component={() => <ModifyQuestion {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/addQuestion" component={() => <AddQuestion data={{ stem: '', options: [''], digest: '' }} />} />
                                        <Route path="/view/autoPage" component={() => <AutoPage {...this.state} fetch={this.fetch} />} />
                                        <Route path="/view/papers" component={() => <Papers {...this.state} fetch={this.fetch} />} />
                                    </Switch>
                                </BrowserRouter>
                            </Switch>
                        </BrowserRouter>
                    </Content>
                </Layout>
            </Fragment>
        );
    }
}
