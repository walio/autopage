import React, { Component } from 'react';

export default (props)=> {
    return [
        <table className="table table-hover">
            <thead>
            <tr>
                <th>id</th>
                <th>类型</th>
                <th>试题内容</th>
                <th>次数</th>
                <th>录入时间</th>
                <th>难度</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {props.data && props.data.map((ele)=>{
                return (
                    <tr key={ele.id}>
                        <td>{ele.id}</td>
                        <td>{ele.type}</td>
                        <td><a data-toggle="modal" data-target="#questionBody" style={{cursor:"pointer"}} onClick={()=>{
                            let body = document.querySelector('#questionBody')
                            body.querySelector('[name=stem]').innerHTML = ele.stem
                            // todo : change data structure in mysql to json
                            body.querySelector('[name=options]').innerHTML = JSON.parse(ele.options).join('<br />')
                            body.querySelector('[name=answer]').innerHTML = ele.answer
                            body.querySelector('[name=digest]').innerHTML = ele.digest
                            body.querySelector('[name=difficulty_level]').innerHTML = ele.difficulty_level
                        }}>{ele.stem}</a></td>
                        <td>{ele.reference}</td>
                        <td>{ele.created_at}</td>
                        <td>{ele.difficulty_level}</td>
                        <td>
                            <div className="btn-group">
                                <a className="glyphicon glyphicon-edit" href={`/view/modifyQuestions?knowsid=${ele.id}`} title="修改科目信息"> </a>&nbsp;&nbsp;&nbsp;
                                <a className="ajax glyphicon glyphicon-remove" href={`/api/questions/${ele.id}`} methods="delete" title="删除科目"> </a>
                            </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>,
        <div id="questionBody" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>试题详情</h4>
                    </div>
                    <div className="modal-body">
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <td style={{borderTop: 'none'}}>题干</td>
                                <td style={{borderTop: 'none'}} name="stem"> </td>
                            </tr>
                            <tr>
                                <td>备选项</td>
                                <td name="options"></td>
                            </tr>
                            <tr>
                                <td>答案</td>
                                <td name="answer"></td>
                            </tr>
                            <tr>
                                <td>解析</td>
                                <td name="digest"></td>
                            </tr>
                            <tr>
                                <td>难度</td>
                                <td name="difficulty_level"></td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    ];
}

