import React from 'react';
import { Form, Button, Radio, Icon, Transfer, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default Form.create()(({ data, fetch, form }) => {
    const id = window.GetQueryString('id');
    if (!data) {
        fetch(`/api/questions/${id}?fields=relatedKnows`);
        return null;
    }
    const { getFieldDecorator, getFieldsValue, setFieldsValue, getFieldValue } = form;
    const nodes = [
        { id: 1, content: 'root', setting: null, created_at: null, updated_at: null },
        { id: 2, content: 'math', setting: null, created_at: null, updated_at: null },
        { id: 3, content: 'literature', setting: null, created_at: null, updated_at: null },
        { id: 4, content: 'algebra', setting: null, created_at: null, updated_at: null },
        { id: 5, content: 'geometry', setting: null, created_at: null, updated_at: null },
        { id: 6, content: 'factorization', setting: null, created_at: null, updated_at: null },
    ];
    const trans = node => node.map(ele => ({ key: ele.id, title: ele.content }));
    return (
        <Form
            layout="horizontal"
            onSubmit={(e) => {
                e.preventDefault();
                console.log(getFieldsValue());
                axios.put(`/api/questions/${id}`, getFieldsValue()).then((res) => {
                    console.log(res.data);
                });
            }}
        >
            <Form.Item
                label="关联知识点"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('knows', {
                    valuePropName: 'targetKeys',
                    initialValue: (data.knows || []).map(ele => ele.id),
                })(<Transfer
                    dataSource={trans(nodes)}
                    titles={['可选知识点', '已选知识点']}
                    render={item => item.title}
                />)}
            </Form.Item>
            <Form.Item
                label="题干"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('stem', { initialValue: data.stem })(
                    <ReactQuill
                        modules={{ toolbar: ['image'] }}
                        formats={['image']}
                    />
                )}
            </Form.Item>
            {data.options && data.options.map((ele, index) => (
                <Form.Item
                    key={index}
                    label={index === 0 ? '选项' : ' '}
                    colon={index === 0}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14, offset: 1 }}
                >
                    {getFieldDecorator(`options[${index}]`, { initialValue: ele })(
                        <ReactQuill
                            modules={{ toolbar: ['image'] }}
                            formats={['image']}
                        />
                    )}
                    {data.options.length > 1 && <Icon
                        type="minus-circle-o"
                        style={{ cursor: 'pointer' }}
                        disabled={index === 0}
                        onClick={() => {
                            data.options = getFieldValue('options');
                            data.options.splice(index, 1);
                            // fixme why must slice?if only <input>,slice is not necessary
                            setFieldsValue({ options: data.options.slice() });
                        }}
                    />}
                </Form.Item>
            ))}
            <Form.Item
                wrapperCol={{ span: 14, offset: 5 }}
            >
                <Button
                    type="dashed"
                    style={{ width: '100%' }}
                    onClick={() => {
                        data.options = getFieldValue('options');
                        data.options.push('');
                        setFieldsValue({ options: data.options.slice() });
                    }}
                >
                    <Icon type="plus" /> 添加选项
                </Button>
            </Form.Item>
            <Form.Item
                label="答案"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('answer', {
                    initialValue: data.answer,
                })(
                    <Radio.Group>
                        {data.options && data.options.map((ele, index) => (
                            <Radio.Button
                                value={index + 1}
                                key={index}
                            >
                                {String.fromCharCode(65 + index)}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item
                label="解析"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('digest', {
                    initialValue: data.digest,
                })(
                    <ReactQuill
                        modules={{ toolbar: ['image'] }}
                        formats={['image']}
                    />
                )}
            </Form.Item>
            <Form.Item
                label="题目难度"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                {getFieldDecorator('difficulty_level', {
                    initialValue: data.difficulty_level,
                })(
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={1}>easy</Select.Option>
                        <Select.Option value={2}>med</Select.Option>
                        <Select.Option value={3}>diff</Select.Option>
                    </Select>
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
