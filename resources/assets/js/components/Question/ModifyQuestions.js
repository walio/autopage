import React, { Component } from 'react';
import { Form, Input, Button, Radio,Icon } from 'antd';
const FormItem = Form.Item;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Test (props) {
    const { getFieldDecorator,getFieldValue } = props.form;
        return (
            <Form layout="horizontal" onSubmit={(e)=>{e.preventDefault();console.log(props.form.getFieldsValue())}}>
                <FormItem
                    label="答案"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10,offset:1 }}
                >
                    {getFieldDecorator("answer",{
                        initialValue:props.answer
                    })(
                        <Radio.Group>
                            {props.options && props.options.map((ele,index)=>(
                                <Radio.Button value={index+1} key={index}>{String.fromCharCode(65+index)}</Radio.Button>
                            ))}
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem
                    label="题干"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10,offset:1 }}
                >
                    {getFieldDecorator("stem",{
                        initialValue:props.stem
                    })(
                        <ReactQuill
                            modules={{toolbar:["image"]}}
                            formats={["image"]}
                        />
                    )}
                </FormItem>
                {props.options && props.options.map((ele,index)=>(
                    <FormItem
                        key={index}
                        label={index === 0 ? '选项' : ' '}
                        colon={index === 0}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 10,offset:1 }}
                    >
                        {getFieldDecorator(`options[${index}]`,{
                            initialValue:ele
                        })(
                            <ReactQuill
                                modules={{toolbar:["image"]}}
                                formats={["image"]}
                            />
                        )}
                    </FormItem>
                ))}
                <FormItem
                    wrapperCol={{ span: 10,offset:5 }}
                >
                    <Button
                        type="dashed"
                        style={{ width: '100%' }}
                        onClick={()=>{
                            props.options.push("")
                            let trick = props.answer
                            props.form.setFieldsValue({
                              answer: trick
                            });
                        }}
                    >
                        <Icon type="plus" /> 添加选项
                    </Button>
                </FormItem>
                <FormItem
                    label="Field B"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 10,offset:1 }}
                >
                    <Input placeholder="input placeholder" />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        )

}

export default Form.create()(Test)