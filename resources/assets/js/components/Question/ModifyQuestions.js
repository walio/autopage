import React, { Component } from 'react';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = props
    }
    componentDidMount () {
        Array.prototype.map.call(document.querySelectorAll(".editor-container"),(ele) => {
            var quill = new Quill(ele, {
                modules: {
                    toolbar: ['image']
                },
                placeholder: '请输入题干',
                theme: 'snow'  // or 'bubble'
            })
        })
    }
    render (){
        return (
            <form action="" method="post" className="form-horizontal" role="form">
                <div className="form-group">
                    <label className="col-sm-2 control-label">知识子域：{console.log(this.state)}</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" placeholder="请输入您的邮箱地址"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">题型：</label>
                    <div className="col-sm-10">
                        <select className="form-control " needle="needle" msg="您必须为要添加的试题选择一种题型"
                                name="args[questiontype]" defaultValue={`难`}>
                            <option rel="" value="难" selected> </option>
                            <option rel="" value="中" selected></option>
                            <option rel="" value="易" selected></option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">题干：</label>
                    <div className="col-sm-10">
                        <div className="editor-container">{this.state.data.stem}</div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">备选项：</label>
                    <div className="col-sm-9">
                        {this.state.data && JSON.parse(this.state.data.options).map((ele)=>[<div className="editor-container">{ele}</div>,<br />])}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2">参考答案：</label>
                    <div className="col-sm-10">
                        {Array(this.state.data.option_number).fill().map((ele,index)=>{
                            return <label className="radio-inline" key={index}>
                                    <input
                                        type="radio"
                                        name="targs[questionanswer1]"
                                        value={index+1}
                                        checked={(parseInt(this.state.data.answer)===index+1)}
                                        onChange={(e)=>{console.log(e)}}
                                    />
                                    {String.fromCharCode(index+65)}
                                    </label>
                        })
                        }
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
