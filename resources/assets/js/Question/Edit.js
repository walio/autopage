import React, { Component } from 'react';
import { Form, Button, Radio, Icon, TreeSelect, Select, Modal } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default Form.create()(class extends Component {
    constructor(props) {
        super(props);
        const id = window.GetQueryString('id');
        this.state = {
            questionId: id,
        };
        axios.get(`/api/questions/${id}?fields=relatedKnows`).then(res => {
            this.setState({ question: res.data });
        });
        axios.get('/api/knows').then(res => {
            const nodes = res.data.nodes.reduce((acc, cur) => {
                acc[cur.id] = cur.name;
                return acc;
            }, {});
            const arcs = res.data.arcs.reduce((acc, cur) => {
                if (acc[cur.from_id]) {
                    acc[cur.from_id].push(cur.to_id);
                } else {
                    acc[cur.from_id] = [cur.to_id];
                }
                return acc;
            }, {});
            const toTreeSelectFormat = currentId => {
                if (arcs[currentId]) {
                    return {
                        label: nodes[currentId],
                        value: currentId,
                        key: currentId,
                        children: arcs[currentId].map(n => toTreeSelectFormat(n)),
                    };
                }
                return {
                    label: nodes[currentId],
                    value: currentId,
                    key: currentId,
                };
            };
            const rootId = parseInt(Object.keys(nodes).find(k => nodes[k] === 'root'), 10);
            this.setState({
                knows: arcs[rootId].map(n => toTreeSelectFormat(n)),
            });
        });
    }
    render() {
        if (!this.state.question || !this.state.knows) {
            return null;
        }
        const {
            validateFields,
            getFieldDecorator,
            getFieldValue,
            setFieldsValue,
        } = this.props.form;
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
                        console.debug('submit data as follows', values);
                        axios.put(`/api/questions/${this.state.questionId}`, values).then(res => {
                            console.debug('returned data as follows', res.data);
                            Modal.success({
                                title: '提交成功',
                                content: '转到试题列表页面',
                                onOk() {
                                    document.location = '/view/questions';
                                },
                            });
                        });
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
                        initialValue: (this.state.question.knows || []).map(ele => ele.id),
                    })(
                        <TreeSelect
                            treeData={this.state.knows}
                            treeCheckable
                            showCheckedStrategy={TreeSelect.SHOW_PARENT}
                            defaultValue={this.state.question.knows.map(know => know.id)}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label="题干"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14, offset: 1 }}
                >
                    {getFieldDecorator('stem', {
                        initialValue: this.state.question.stem,
                    })(
                        <ReactQuill
                            modules={{ toolbar: ['image'] }}
                            formats={['image']}
                        />
                    )}
                </Form.Item>
                {this.state.question.options.map((ele, index) => (
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
                        {this.state.question.options.length > 1 && <Icon
                            type="minus-circle-o"
                            style={{ cursor: 'pointer' }}
                            disabled={index === 0}
                            onClick={() => {
                                this.state.question.options = getFieldValue('options');
                                this.state.question.options.splice(index, 1);
                                // fixme why must slice?if only <input>,slice is not necessary
                                setFieldsValue({ options: this.state.question.options.slice() });
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
                            this.state.question.options = getFieldValue('options');
                            this.state.question.options.push('');
                            setFieldsValue({ options: this.state.question.options.slice() });
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
                        initialValue: this.state.question.answer,
                    })(
                        <Radio.Group>
                            {this.state.question.options &&
                            this.state.question.options.map((ele, index) => (
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
                        initialValue: this.state.question.digest,
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
                    {getFieldDecorator('difficulty', {
                        initialValue: this.state.question.difficulty,
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
    }
});
