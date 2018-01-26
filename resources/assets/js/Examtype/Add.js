import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import KnowsRatio from '../common/KnowsRatio';


export default Form.create()(({ form }) => {
    const { getFieldDecorator, validateFields } = form;
    return (
        <Form
            layout="horizontal"
            onSubmit={(e) => {
                e.preventDefault();
                validateFields((err, values) => {
                    if (!err) {
                        console.debug('data to submit', values);
                        axios.post('/api/examtypes', values).then((res) => {
                            console.debug('returned data:');
                            console.debug(res.data);
                            Modal.success({
                                title: '提交成功',
                                content: '转到试卷类型页面',
                                onOk() {
                                    document.location = '/view/examtypes';
                                },
                            });
                        });
                    }
                });
            }}
        >
            <Form.Item
                label="试卷类型"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入试卷类型名称!' }],
                })(
                    <Input placeholder="请输入试卷类型名称" />
                )}
            </Form.Item>
            <Form.Item
                label="试卷类型"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('knows', {
                    rules: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value.reduce((acc, cur) => acc + cur.percent, 0) !== 100) {
                                callback('知识点比例必须为100');
                            } else {
                                callback();
                            }
                        },
                    }],
                    validateTrigger: 'onBlur',
                })(
                    <KnowsRatio />
                )}
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 14, offset: 5 }}
            >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
});
