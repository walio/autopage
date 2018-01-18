import React from 'react';
import { Form, Input, Tree, InputNumber, Button, Modal } from 'antd';
import '../../sass/mTreeNode.css';


export default ({ data, fetch }) => {
    const id = window.GetQueryString('id');
    if (!data) {
        fetch(`/api/examtype/${id}`);
        return null;
    }
    console.debug('data loaded in component examtype.edit:');
    console.debug(data);
    const { TreeNode } = Tree;
    const graph = { nodes: [{ id: 1, content: 'root', setting: null, created_at: null, updated_at: null }, { id: 2, content: 'math', setting: null, created_at: null, updated_at: null }, { id: 3, content: 'literature', setting: null, created_at: null, updated_at: null }, { id: 4, content: 'algebra', setting: null, created_at: null, updated_at: null }, { id: 5, content: 'geometry', setting: null, created_at: null, updated_at: null }, { id: 6, content: 'factorization', setting: null, created_at: null, updated_at: null }], arcs: [{ id: 1, from_id: 1, to_id: 2, created_at: null, updated_at: null }, { id: 2, from_id: 1, to_id: 3, created_at: null, updated_at: null }, { id: 3, from_id: 2, to_id: 4, created_at: null, updated_at: null }, { id: 4, from_id: 2, to_id: 5, created_at: null, updated_at: null }, { id: 5, from_id: 4, to_id: 6, created_at: null, updated_at: null }] };
    const root = graph.nodes.find(a => a.content === 'root');
    const render = node => {
        // todo: combine filter and map to reduce
        const arcs = graph.arcs.filter(arc =>
            arc.from_id === node.id
        );
        return (
            <TreeNode
                style={{ height: '500px' }}
                title={
                    <div>
                        {node.content} : <InputNumber
                            min={0}
                            max={100}
                            defaultValue={
                                data.knows.find(e => e.id === node.id) ?
                                    data.knows.find(e => e.id === node.id).percent :
                                    undefined
                            }
                            onChange={value => {
                                const rn = data.knows.find(v => v.id === node.id);
                                if (rn) {
                                    rn.percent = value;
                                } else {
                                    data.knows.push({ id: node.id, percent: value });
                                }
                            }}
                        />
                    </div>
                }
            >
                {arcs.length ? arcs.map(arc =>
                    render(graph.nodes.find(_ => _.id === arc.to_id))
                ) : null}
            </TreeNode>
        );
    };
    return (
        <Form
            layout="horizontal"
            onSubmit={(e) => {
                e.preventDefault();
                console.debug('submit data:');
                console.debug(data);
                if (data.knows.reduce((acc, cur) => acc + cur.percent, 0) !== 100) {
                    Modal.error({
                        title: '提交错误',
                        content: '知识点比例和必须为100',
                    });
                    return;
                }
                axios.put(`/api/examtype/${id}`, data).then((res) => {
                    console.debug('returned data:');
                    console.debug(res.data);
                    Modal.success({
                        title: '提交成功',
                        content: '转到试卷类型页面',
                        onOk() {
                            document.location = '/view/examtypes';
                        },
                    });
                });
            }}
        >
            <Form.Item
                label="试卷类型"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                <Input placeholder="请输入试卷类型名称" defaultValue={data.name} onChange={e => { data.name = e.target.value; }} />
            </Form.Item>
            <Form.Item
                label="知识点比例"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14, offset: 1 }}
            >
                <Tree>
                    {graph.arcs.filter(arc =>
                        arc.from_id === root.id
                    ).map(arc =>
                        render(graph.nodes.find(_ => _.id === arc.to_id))
                    )}
                </Tree>
            </Form.Item>
            <Form.Item
                wrapperCol={{ span: 14, offset: 5 }}
            >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};
