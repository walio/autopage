import React, { Component } from 'react';
import 'bootstrap-table'

export default (props)=> {
        window.onload = ()=> {
            $('#table123').bootstrapTable({
                columns: [{
                    field: 'id',
                    title: 'id',
                    width: '35%'
                }, {
                    field: 'content',
                    title: '内容',
                    width: '35%',
                }, {
                    field: 'id',
                    title: '操作',
                    width: '30%',
                    formatter: (value, row, index) => {
                        return [
                            '<div class="btn-group">',
                            `<a class="btn fa fa-list" href="/knows?parentknowsid=${value}" title="章节列表"></a>`,
                            `<a class="btn fa fa-edit" href="/modifyKnows?knowsid=${value}" title="修改科目信息"></a>`,
                            `<a class="btn ajax fa fa-remove" href="/api/knows/${value}" methods="delete" title="删除科目"></a>`,
                            '</div>',
                        ].join('');
                    }
                },],
                responseHandler: (_) => {
                    return _["childKnows"]
                }
            })
        }
        return (
            <div className="table-responsive">
                <table
                    id="table123"
                    data-toggle="table"
                    className="table table-hover"
                    data-url={"/api/knows/" + GetQueryString("parentknowsid")}
                >
                </table>
            </div>
        );
}

