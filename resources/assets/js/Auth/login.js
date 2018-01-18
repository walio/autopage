import React from 'react';
import { Form, Input, Button, Icon, Row, Col, Card, Modal } from 'antd';

export default Form.create()(({ form }) => {
    const { getFieldDecorator, getFieldsValue, getFieldValue } = form;
    return (
        <Row>
            <Col span={16} offset={4}>
                <Card title="Login" style={{ margin: '8% 0' }}>
                    <Form
                        onSubmit={event => {
                            event.preventDefault();
                            axios.post('/api/token', getFieldsValue()).then(res => {
                                // todo: crypto
                                localStorage.s = res.data.token;
                                localStorage.u = getFieldValue('name');
                                document.location = document.referrer;
                            }).catch(error => {
                                console.log(error);
                                Modal.error({
                                    title: '登录失败',
                                    content: '用户名或密码错误',
                                });
                            });
                        }}
                        className="login-form"
                    >
                        <Form.Item
                            label="用户名"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 10, offset: 1 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="关联知识点"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 10, offset: 1 }}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 10, offset: 7 }}
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
});
