import { Table, Modal, Row, Col, Icon } from 'antd';
import React, { Fragment, Component } from 'react';
import '../../sass/noNewLine.css';

export default class extends Component {
    state = {
        loading: false,
        questions: [],
        pagination: {},
        detailVisible: false,
        questionDetail: {},
    };
    componentDidMount() {
        this.fetch();
    }
    fetch(params = {}) {
        this.setState({ loading: true });
        axios.get('/api/questions', { params }).then(res => {
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.total;
            this.setState({
                questions: res.data.data,
                loading: false,
                pagination,
            });
        });
    }
    render() {
        const outer = this;
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            sorter: true,
            className: 'noNewLine',
        }, {
            title: '类型',
            dataIndex: 'type',
            sorter: true,
            className: 'noNewLine',
        }, {
            title: '题干',
            dataIndex: 'stem',
            render(stem, record) {
                return (
                    <a
                        onClick={() => {
                            outer.setState({
                                detailVisible: true,
                                questionDetail: record,
                            });
                        }}
                    >
                        {stem}
                    </a>
                );
            },
        }, {
            title: '选中次数',
            dataIndex: 'reference',
            sorter: true,
            className: 'noNewLine',
        }, {
            title: '录入时间',
            dataIndex: 'created_at',
            sorter: true,
            className: 'noNewLine',
        }, {
            title: '难度',
            dataIndex: 'difficulty',
            sorter: true,
            className: 'noNewLine',
        }, {
            title: '操作',
            render(id, record) {
                return (
                    <Fragment>
                        <a
                            style={{ marginRight: '20%' }}
                            href={`modifyQuestion?id=${record.id}`}
                        >
                            <Icon type="edit" title="编辑" />
                        </a>
                        <a
                            style={{ marginRight: '20%' }}
                            onClick={() => { console.log(record); }}
                        >
                            <Icon type="delete" title="放入回收站" />
                        </a>
                        <a
                            onClick={() => { console.log(record); }}
                        >
                            <Icon type="close" title="直接删除" />
                        </a>
                    </Fragment>
                );
            },
            width: '15%',
        }];
        return (
            <Fragment>
                <Table
                    checkable
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.questions}
                    rowKey="id"
                    pagination={this.state.pagination}
                    onChange={(pagination, filters, sorter) => {
                        const pager = this.state.pagination;
                        pager.current = pagination.current;
                        this.fetch({
                            results: pagination.pageSize,
                            page: pagination.current,
                            sortField: sorter.field,
                            sortOrder: sorter.order,
                            ...filters,
                        });
                    }}
                />
                <Modal
                    title="题目详情"
                    visible={this.state.detailVisible}
                    onCancel={() => {
                        this.setState({ detailVisible: false });
                    }}
                    footer={null}
                    width={700}
                >
                    <div>
                        <Row style={{ marginBottom: 50 }}>
                            <Col span={4}>题干</Col>
                            <Col span={20}>{this.state.questionDetail.stem}</Col>
                        </Row>
                        <Row style={{ marginBottom: 20 }}>
                            <Col span={4}>选项</Col>
                            <Col span={20}>
                                {this.state.questionDetail.options &&
                                this.state.questionDetail.options.map(
                                    (ele, index) => (
                                        <p key={index}>{ele}</p>
                                    )
                                )}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 50 }}>
                            <Col span={4}>答案</Col>
                            <Col span={20}>
                                {String.fromCharCode(65 + this.state.questionDetail.answer)}
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 50 }}>
                            <Col span={4}>解析</Col>
                            <Col span={20}>{this.state.questionDetail.digest}</Col>
                        </Row>
                        <Row style={{ marginBottom: 50 }}>
                            <Col span={4}>难度</Col>
                            <Col span={20}>{this.state.questionDetail.difficulty}</Col>
                        </Row>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

