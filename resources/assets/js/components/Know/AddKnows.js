import React, { Component } from 'react';

export default class AddKnows extends Component{
    render () {
        return (
            <form action="/api/knows" method="post" className="form-horizontal">
                <input type="hidden" name="_token" value={document.head.querySelector('meta[name="csrf-token"]').content}/>
                <fieldset>
                    <div className="control-group">
                        <label htmlFor="subject" className="control-label">科目名称：</label>
                        <div className="controls">
                            <input name="content" type="text" size="30" />
                        </div>
                    </div>
                    <div className="control-group">
                        <label htmlFor="subject" className="control-label">知识点添加路径：</label>
                        
                    </div>
                    <div className="control-group">
                        <div className="controls">
                            <button className="btn btn-primary" type="submit">提交</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        )
    }
}