import React, { Component } from 'react';
// import echarts from 'echarts'

export default class Knows extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount () {
        // let option = {
        //     tooltip: {},
        //     animationDurationUpdate: 1500,
        //     animationEasingUpdate: 'quinticInOut',
        //     series: [
        //         {
        //             type: 'graph',
        //             roam: true,
        //             name: 'structure',
        //             layout: 'force',
        //             draggable: true,
        //             force: {
        //                 edgeLength: 200
        //             }
        //         }
        //     ]
        // };
        // let ee = echarts.init(document.getElementById('subject'))
        // ee.setOption(option)
        // console.log(this.props.data)
        // this.props.data && ee.setOption({
        //     series:[{
        //         name: 'structure',
        //         data: this.props.data.nodes.map((ele)=>({'name':String(ele.id)})),
        //         links: this.props.data.arc.map((ele)=>({'source':String(ele.from_id),'target':String(ele.to_id)}))
        //     }]
        // })
    }

    render () {
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
                {0 && this.props.data.children.map((ele)=>(
                    <tr key={ele.id}>
                        <td>{ele.id}</td>
                        <td>{ele.content}</td>
                        <td>
                            <div className="btn-group">
                                <a className="btn fa fa-list" href={`/view/knows?parentknowsid=${ele.id}`}
                                   title="章节列表"> </a>
                                <a className="btn fa fa-edit" href={`/view/modifyKnows?knowsid=${ele.id}`}
                                   title="修改科目信息"> </a>
                                <a className="btn ajax fa fa-remove" href={`/api/knows/${ele.id}`} method="delete"
                                   title="删除科目"> </a>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        ]
    }
}


