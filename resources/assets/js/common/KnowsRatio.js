import React, { Component } from 'react';
import { Tree, InputNumber } from 'antd';
import '../../sass/mTreeNode.css';


export default class KnowsRatio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratios: props.value || [],
            nodes: {},
            arcs: {},
        };
    }
    componentDidMount() {
        this.state.isMounted = true;
        const outer = this;
        axios.get('/api/knows').then(res => {
            if (outer.state.isMounted) {
                this.setState({
                    nodes: res.data.nodes.reduce((acc, cur) => {
                        acc[cur.id] = cur.name;
                        return acc;
                    }, {}),
                    arcs: res.data.arcs.reduce((acc, cur) => {
                        if (acc[cur.from_id]) {
                            acc[cur.from_id].push(cur.to_id);
                        } else {
                            acc[cur.from_id] = [cur.to_id];
                        }
                        return acc;
                    }, {}),
                });
            }
        });
    }
    componentWillUnmount() {
        this.state.isMounted = false;
    }
    render() {
        if (!this.state.nodes || !this.state.ratios) {
            return null;
        }
        const rootId = parseInt(Object.keys(this.state.nodes).find(k => this.state.nodes[k] === 'root'), 10);
        if (!this.state.arcs[rootId]) {
            return null;
        }
        const renderKnows = nodeId =>
            (
                <Tree.TreeNode
                    key={nodeId}
                    style={{ height: '500px' }}
                    title={
                        <div>
                            {this.state.nodes[nodeId]} : <InputNumber
                                min={0}
                                max={100}
                                defaultValue={
                                    this.state.ratios.find(e => e.id === nodeId) ?
                                        this.state.ratios.find(e => e.id === nodeId).percent :
                                        undefined
                                }
                                onBlur={e => {
                                    const rn = this.state.ratios.find(n => n.id === nodeId);
                                    const v = parseInt(e.target.value, 10) || 0;
                                    if (rn) {
                                        rn.percent = v;
                                    } else {
                                        this.state.ratios.push({ id: nodeId, percent: v });
                                    }
                                    this.props.onChange(this.state.ratios);
                                }}
                            />
                        </div>
                    }
                >
                    {this.state.arcs[nodeId] && this.state.arcs[nodeId].map(
                        toId => renderKnows(toId)
                    )}
                </Tree.TreeNode>
            );
        return (
            <Tree>
                {this.state.arcs[rootId].map(
                    toId => renderKnows(toId)
                )}
            </Tree>
        );
    }
}
