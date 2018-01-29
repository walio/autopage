import React, { Component } from 'react';
import { Layout, Divider } from 'antd';
import '../../sass/well.css';

export default class extends Component {
    constructor(props) {
        super(props);
        const id = window.GetQueryString('id');
        axios.get(`/api/paper/${id}?type=dataOnly`).then(res => {
            this.setState(res.data);
        });
    }
    render() {
        if (!this.state) {
            return null;
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                        <h2>{this.state.name}</h2>
                        {this.state.questions.map((question, index) => {
                            switch (question.type) {
                            default:
                            case '1': return (
                                <div className="well">
                                    <p>{index + 1}. {question.stem}</p>
                                    <Divider />
                                    {question.options.map((option, oindex) => (
                                        <p>{String.fromCharCode(65 + oindex)}. {option}</p>
                                    ))}
                                    <Divider />
                                    <p>
                                        参考答案：
                                        {String.fromCharCode(64 + question.answer)}
                                        使用次数：{question.reference}
                                    </p>
                                </div>
                            );
                            }
                        })}
                    </div>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'center' }}>
                    出卷人{this.state.user_name}
                </Layout.Footer>
            </Layout>
        );
    }
}
