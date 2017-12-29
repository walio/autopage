import React, { Component } from 'react';
import echarts from 'echarts'

export default (props)=> {
    let option = {
        title: {
            text: 'Graph 简单示例'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: [{
                    name: '节点1',
                    x: 300,
                    y: 300
                }, {
                    name: '节点2',
                    x: 800,
                    y: 300
                }, {
                    name: '节点3',
                    x: 550,
                    y: 100
                }, {
                    name: '节点4',
                    x: 550,
                    y: 500
                }],
                // links: [],
                links: [{
                    source: 0,
                    target: 1,
                    symbolSize: [5, 20],
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 5,
                            curveness: 0.2
                        }
                    }
                }, {
                    source: '节点2',
                    target: '节点1',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    lineStyle: {
                        normal: { curveness: 0.2 }
                    }
                }, {
                    source: '节点1',
                    target: '节点3'
                }, {
                    source: '节点2',
                    target: '节点3'
                }, {
                    source: '节点2',
                    target: '节点4'
                }, {
                    source: '节点1',
                    target: '节点4'
                }],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            }
        ]
    };
    return [
        <table className="table table-hover">
            <thead>
            <tr>
                <th>知识点id</th>
                <th>知识点内容</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {props.data && props.data.child_knows.map((ele)=>(
                <tr key={ele.id}>
                    <td>{ele.id}</td>
                    <td>{ele.content}</td>
                    <td>
                        <div className="btn-group">
                            <a className="btn fa fa-list" href={`/view/knows?parentknowsid=${ele.id}`} title="章节列表"> </a>
                            <a className="btn fa fa-edit" href={`/view/modifyKnows?knowsid=${ele.id}`} title="修改科目信息"> </a>
                            <a className="btn ajax fa fa-remove" href={`/api/knows/${ele.id}`} method="delete" title="删除科目"> </a>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>,
        <div id="subject"> </div>,
        <div>{console.log(document.getElementById('subject'))}</div>
        ]
}


