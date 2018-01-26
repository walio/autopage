import React, { Fragment } from 'react';
import { Table, Modal, Icon } from 'antd';

export default ({ data, fetch }) => {
    if (!data) {
        fetch('/api/paper?page=1');
        return null;
    }
    const confirmedAction = record => () => {
        axios.delete(`/api/paper/${record.id}`).then(() => {
            Modal.success({
                title: '删除成功',
                content: '点击确定刷新页面',
                onOk() {
                    window.location.reload();
                },
            });
        }).catch(error => {
            console.debug('fail in delete, status as follow', error.status);
            Modal.error({
                title: '删除失败',
                content: '删除失败，请重新尝试',
            });
        });
    };
    const columns = [{
        title: 'id',
        dataIndex: 'id',
        sorter: true,
    }, {
        title: '试卷类型名称',
        dataIndex: 'examtype_name',
        sorter: true,
    }, {
        title: '出卷人名称',
        dataIndex: 'user_name',
        sorter: true,
    }, {
        title: '操作',
        render(record) {
            return (
                <Fragment>
                    <a
                        style={{ marginRight: '20%' }}
                        href={`/view/paperDetail?id=${record.id}`}
                        target="_blank"
                    >
                        <Icon type="bars" title="预览" />
                    </a>
                    <a
                        style={{ marginRight: '20%' }}
                        href={`/view/paperDetail?id=${record.id}`}
                    >
                        <Icon type="download" title="下载word试卷" />
                    </a>
                    <a
                        style={{ marginRight: '20%' }}
                        href={`/view/paperDetail?id=${record.id}`}
                    >
                        <Icon type="download" title="下载word答案" />
                    </a>
                    <a
                        onClick={() => {
                            Modal.confirm({
                                title: '确认操作',
                                content: '是否确认删除？',
                                onOk: confirmedAction(record),
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
