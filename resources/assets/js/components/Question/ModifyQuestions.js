import React, { Component } from 'react';
import Quill from 'quill'
export default (props) => {
    if(!props.data) {
        return null
    }else{
        console.log($('#editor-container'))
        window.onload = () => {
            let quill = new Quill('#editor-container', {
                modules: {
                    toolbar: [
                        [{header: [1, 2, false]}],
                        ['bold', 'italic', 'underline'],
                        ['image', 'code-block']
                    ]
                },
                placeholder: 'Compose an epic...',
                theme: 'snow'  // or 'bubble'
            });
        }
        return (
            <form action="" method="post" className="form-horizontal" role="form">
                <div className="form-group">
                    <label className="col-sm-2 control-label">知识子域：</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" placeholder="请输入您的邮箱地址"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">题型：</label>
                    <div className="col-sm-10">
                        <select className="form-control " needle="needle" msg="您必须为要添加的试题选择一种题型"
                                name="args[questiontype]" defaultValue={`难`}>
                            <option rel="" value="难" selected></option>
                            <option rel="" value="中" selected></option>
                            <option rel="" value="易" selected></option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">题干：</label>
                    <div className="col-sm-10" id="editor-container">
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">备选项：</label>
                    <div className="col-sm-10">
                        <textarea className="form-control col-sm-2" name="args[questionselect]"
                                  id="questionselect"> </textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">参考答案：</label>
                    <div className="col-sm-10">
                        <div className="form-control">
                            <label className="radio inline"><input type="radio" name="targs[questionanswer1]"
                                                                   value="A"/>A</label>
                            <label className="radio inline"><input type="radio" name="targs[questionanswer1]"
                                                                   value="B"/>B</label>
                            <label className="radio inline"><input type="radio" name="targs[questionanswer1]"
                                                                   value="C"/>C</label>
                            <label className="radio inline"><input type="radio" name="targs[questionanswer1]"
                                                                   value="D"/>D</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">习题解析：</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" name="args[questiondescribe]"
                                  id="questiondescribe"> </textarea>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2 ">难度：</label>
                    <div className="col-sm-10">
                        <select className="form-control" name="args[questionlevel]" needle="needle"
                                msg="您必须为要添加的试题设置一个难度" defaultValue={1}>
                            <option value="1">易</option>
                            <option value="2">中</option>
                            <option value="3">难</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-control">
                        <button className="btn btn-primary" type="submit">提交</button>
                    </div>
                </div>
            </form>
        )
    }
}
