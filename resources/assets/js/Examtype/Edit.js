import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import KnowsRatio from '../common/KnowsRatio';


export default Form.create()(({ data, fetch, form }) => {
    const id = window.GetQueryString('id');
    if (!data) {
        fetch(`/api/examtype/${id}`);
        return null;
    }
    const { getFieldDecorator, validateFields } = form;
    return (
        <Form
            layout="horizontal"
            onSubmit={(e) => {
                e.preventDefault();
                validateFields((err, values) => {
                    if (!err) {
                        console.debug('data to submit', values);
                        axios.put(`/api/examtype/${id}`, values).then((res) => {
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
                    } else {
                        console.debug('fail to validate, data as follows', values);
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
                    validateTrigger: 'onBlur',
                    initialValue: data.name,
                })(
                    <Input placeholder="请输入试卷类型名称" />
                )}
            </Form.Item>
            <Form.Item
                label="知识点比例"
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
                    initialValue: data.knows,
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
