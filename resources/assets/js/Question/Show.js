import { Table, Modal, Row, Col, Icon } from 'antd';
import React, { Fragment } from 'react';

export default ({ data, fetch }) => {
    if (!data) {
        fetch('/api/questions?page=1');
        return null;
    }
    const promptModal = record => (
        Modal.info({
            title: '题目详情',
            content: (
                <div>
                    <Row>
                        <Col span={4}>题干</Col>
                        <Col span={12} dangerouslySetInnerHTML={{ __html: record.stem }} />
                    </Row>
                    <Row>
                        <Col span={4}>选项</Col>
                        <Col span={12}>
                            {record.options.map(
                                (ele, index) => (
                                    <p key={index} dangerouslySetInnerHTML={{ __html: ele }} />
                                )
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>答案</Col>
                        <Col span={12}><p>{String.fromCharCode(65 + record.answer)}</p></Col>
                    </Row>
                    <Row>
                        <Col span={4}>解析</Col>
                        <Col span={12} dangerouslySetInnerHTML={{ __html: record.digest }} />
                    </Row>
                    <Row>
                        <Col span={4}>难度</Col>
                        <Col span={12}><p>{record.difficulty_level}</p></Col>
                    </Row>
                </div>
            ),
        })
    );
    const columns = [{
        title: 'id',
        dataIndex: 'id',
        sorter: true,
    }, {
        title: '类型',
        dataIndex: 'type',
        sorter: true,
    }, {
        title: '题干',
        dataIndex: 'stem',
        // todo:security issues
        render(stem, record) {
            return (
                <a
                    dangerouslySetInnerHTML={{ __html: stem }}
                    onClick={() => (promptModal(record))}
                />
            );
        },
    }, {
        title: '选中次数',
        dataIndex: 'reference',
        sorter: true,
    }, {
        title: '录入时间',
        dataIndex: 'created_at',
        sorter: true,
    }, {
        title: '难度',
        dataIndex: 'difficulty_level',
        sorter: true,
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
    }];
    return (
        <Table
            columns={columns}
            dataSource={data.data}
            rowKey="id"
        />
    );
};

