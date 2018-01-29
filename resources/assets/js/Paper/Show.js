import React, { Fragment, Component } from 'react';
import { Table, Modal, Icon } from 'antd';
import Download from './Download';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            papers: [],
            visible: false,
        };
        axios.get('/api/paper?page=1').then(res => {
            this.setState({ papers: res.data.data });
        });
    }
    render() {
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
        const outer = this;
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
                            onClick={() => {
                                axios.get(`/api/paper/${record.id}`).then(res => {
                                    outer.setState({
                                        visible: true,
                                        paper: res.data,
                                    });
                                });
                            }}
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
            <Fragment>
                <Table
                    columns={columns}
                    dataSource={this.state.papers}
                    rowKey="id"
                />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <Download paper={this.state.paper} />
                </Modal>
            </Fragment>
        );
    }
}
