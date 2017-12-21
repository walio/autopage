import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-table'

export default class Knows extends Component {
    componentDidMount() {
        $('#table123').bootstrapTable({
            columns: [{
                field: 'Id',
                title: 'id',
                width: '35%'
            },{
                field: 'content',
                title: '内容',
                width: '35%',
            },{
                field: 'Id',
                title: '操作',
                width: '30%',
                formatter: (value, row, index) => {
                    return [
                        '<div class="btn-group">',
                        `<a class="btn fa fa-list" href="/subject?knowsid=${value}" title="章节列表"></a>`,
                        `<a class="btn fa fa-edit" href="/subject_modify?knowsid=${value}" title="修改科目信息"></a>`,
                        '<a class="btn ajax_delete fa fa-remove" href="/api/knows" title="删除科目"></a>',
                        '</div>',
                    ].join('');
                }
            },]
        })
    }
    render() {
        return (
            <div className="table-responsive">
                <table
                    id="table123"
                    data-toggle="table"
                    className="table table-hover"
                    data-url= {"/api/knows/" + GetQueryString("id")}
                >
                    <thead>
                    <tr>
                        <th data-field="Id">科目ID</th>
                        <th data-field="content">科目名称</th>
                    </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

if (document.getElementById('Knows')) {
    ReactDOM.render(<Knows />, document.getElementById('Knows'));
}

