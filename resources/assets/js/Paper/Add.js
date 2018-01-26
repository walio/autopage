import React from 'react';
import { Form, Select, Modal, Button, Input, Radio } from 'antd';
import KnowsRatio from '../common/KnowsRatio';

export default Form.create()(({ data, fetch, form }) => {
    if (!data) {
        fetch('/api/examtype');
        return null;
    }
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    return (
        <Form
            layout="horizontal"
            onSubmit={e => {
                e.preventDefault();
                validateFields((err, values) => {
                    if (err) {
                        console.debug('fail in submit, data as follows', values);
                        return;
                    }
                    const { useExamType, ...d } = values;
                    console.debug('submit data as follows', d);
                    axios.post('/api/paper', values).then((res) => {
                        console.debug('returned data as follows', res.data);
                        Modal.success({
                            title: '提交成功',
                            content: '转到试卷类型页面',
                            onOk() {
                                document.location = '/view/examtypes';
                            },
                        });
                    });
                });
            }}
        >
            <Form.Item
                label="试卷名称"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '未填写试卷名称!' }],
                    validateTrigger: 'onBlur',
                })(
                    <Input placeholder="请输入试卷名称" />
                )}
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 10, offset: 5 }}
            >
                {getFieldDecorator('useExamType', {
                    initialValue: '1',
                })(
                    <Radio.Group>
                        <Radio.Button value="1">选择试卷类型</Radio.Button>
                        <Radio.Button value="0">指定知识点比例</Radio.Button>
                    </Radio.Group>
                )}
            </Form.Item>
            {getFieldValue('useExamType') === '0' &&
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
                    initialValue: [],
                })(
                    <KnowsRatio />
                )}
            </Form.Item>
            }
            {getFieldValue('useExamType') === '1' &&
            <Form.Item
                label="试卷类型"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                {getFieldValue('useExamType') && getFieldDecorator('examtype', {
                    rules: [{ required: true, message: '未选择试卷类型!' }],
                })(
                    <Select placeholder="请选择试卷类型">
                        {data.data.map((examtype, id) => (
                            <Select.Option
                                key={id}
                                value={examtype.id}
                            >
                                {examtype.name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
            }
            <Form.Item
                wrapperCol={{ span: 10, offset: 5 }}
            >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
});
