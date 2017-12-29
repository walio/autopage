import React, { Component } from 'react';

export default (props)=> {
    window.onload = ()=> {
        $('#table123').bootstrapTable({
            columns: [{
                field: 'id',
                title: 'id',
            }, {
                field: 'type',
                title: '类型',
            }, {
                field: 'stem',
                title: '试题内容',
                formatter: (value, row, index) => {
                    return `<a data-toggle="modal" data-target="#questionBody" style="cursor: pointer;">${value}</a>
                            <div id="questionBody" class="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button aria-hidden="true" class="close" type="button" data-dismiss="modal">×</button>
                                            <h4>试题详情</h4>
                                        </div>
                                        <div class="modal-body">
                                            <table class="table table-hover" style="background-color: inherit;">
                                                <tr>
                                                    <td style="border-top: none;">题干</td>
                                                    <td style="border-top: none;">${row.stem}</td>
                                                </tr>
                                                <tr>
                                                    <td>备选项</td>
                                                    <td>${row.options}</td>
                                                </tr>
                                                <tr>
                                                    <td>答案</td>
                                                    <td>${row.answer}</td>
                                                </tr>
                                                 <tr>
                                                    <td>解析</td>
                                                    <td>${row.digest}</td>
                                                </tr>
                                                <tr>
                                                    <td>难度</td>
                                                    <td>${row.difficulty_level}</td>
                                                </tr>
                                            </table>
                                        
                                        </div>
                                        <div class="modal-footer">
                                            <button class="btn" data-dismiss="modal">关闭</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                }
            }, {
                field: 'reference',
                title: '次数',
            }, {
                field: 'created_at',
                title: '录入时间',
            }, {
                field: 'difficulty_level',
                title: '难度',
            }, {
                field: 'id',
                title: '操作',
                formatter: (value, row, index) => {
                    return `
                        <div class="btn-group">
                            <a class="btn fa fa-edit" href="/modifyQuestions?knowsid=${value}" title="修改科目信息"></a>
                            <a class="btn ajax fa fa-remove" href="/api/questions/${value}" methods="delete" title="删除科目"></a>
                        </div>`
                }
            }]
        })
    }
    return [
        <div key="1">adsf</div>,
        <table
            key="2"
            id="table123"
            data-toggle="table"
            className="table table-hover"
            data-url={"/api/questions" + location.search}
        >
        </table>
    ];
}

