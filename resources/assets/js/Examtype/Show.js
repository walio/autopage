import React, { Fragment } from 'react';
import { Table, Icon, Modal } from 'antd';

export default ({ data, fetch }) => {
    if (!data) {
        fetch('/api/examtype?page=1');
        return null;
    }
    const columns = [{
        title: 'id',
        dataIndex: 'id',
        sorter: true,
    }, {
        title: '试卷类型',
        dataIndex: 'name',
        sorter: true,
    }, {
        title: '操作',
        render(record) {
            return (
                <Fragment>
                    <a
                        style={{ marginRight: '20%' }}
                        href={`modifyExamtype?id=${record.id}`}
                    >
                        <Icon type="edit" title="编辑" />
                    </a>
                    <a
                        onClick={() => {
                            const confirmedAction = () => {
                                axios.delete(`/api/examtype/${record.id}`).then(() => {
                                    Modal.success({
                                        title: '删除成功',
                                        content: '点击确定刷新页面',
                                        onOk() {
                                            window.location.reload();
                                        },
                                    });
                                }).catch(error => {
                                    console.debug(error.status);
                                    Modal.error({
                                        title: '删除失败',
                                        content: '删除失败，请重新尝试',
                                    });
                                });
                            };
                            Modal.confirm({
                                title: '确认操作',
                                content: '是否确认删除？',
                                onOk: confirmedAction,
                            });
                        }}
                    >
                        <Icon type="close" title="删除" />
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
