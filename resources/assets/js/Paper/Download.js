import React, { Component } from 'react';
import { Select, Button, Form } from 'antd';
import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';

export default Form.create()(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
        };
        axios.get('/template').then(res => {
            this.setState({ templates: res.data });
        });
    }
    compose(content) {
        const zip = new JSZip(content);
        const doc = new Docxtemplater().loadZip(zip);
        doc.setData(this.props.paper);

        try {
            doc.render();
        } catch (DocRenderError) {
            const errorMsg = {
                message: DocRenderError.message,
                name: DocRenderError.name,
                stack: DocRenderError.stack,
                properties: DocRenderError.properties,
            };
            console.log(errorMsg);
            throw DocRenderError;
        }

        return doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
    }
    render() {
        const { getFieldDecorator, validateFields, getFieldValue } = this.props.form;
        function loadFile(url, callback) {
            JSZipUtils.getBinaryContent(url, callback);
        }
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
                        loadFile(`/template/${getFieldValue('templateName')}?api_token=${window.localStorage.s}`, (error, content) => {
                            if (error) { throw error; }
                            console.debug('paper as follow', this.props.paper);
                            saveAs(this.compose(content), 'output.docx');
                        });
                    });
                }}
            >
                <Form.Item
                    label="word模板名称"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12, offset: 1 }}
                >
                    {getFieldDecorator('templateName', {
                        rules: [{ required: true, message: '未填写word模板名称!' }],
                        validateTrigger: 'onBlur',
                    })(

                        <Select
                            style={{ width: '75%' }}
                            placeholder="请选择word模板"
                        >
                            {this.state.templates.map(templ => (
                                <Select.Option value={templ}>{templ}</Select.Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 10, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">下载</Button>
                </Form.Item>
            </Form>
        );
    }
});
