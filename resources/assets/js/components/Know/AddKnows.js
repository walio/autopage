import React, { Component } from 'react';

export default class AddKnows extends Component{
    constructor (){
        super()
        this.state = {
            knowsList: <option> </option>
        }
    }
    componentDidMount(){
        axios.get(`/api/knows/`+GetQueryString('parentknowsid')).then((res)=>{
            let knows = res.data.parentKnows.map((value,index,array)=>{
                return <select key={value.level}><option value={value.id}>{value.content}</option></select>
            })
            knows = <div className="controls">
                        {knows}
                        <select key={res.data.selfKnows.level} name="parent_id"><option value={res.data.selfKnows.id}>{res.data.selfKnows.content}</option></select>
                        <input type="hidden" name="level" value={res.data.selfKnows.level+1}/>
                    </div>
            this.setState({knowsList: knows})
        })
    }
    render () {
        return (
            <form action="/api/knows" method="post" className="form-horizontal">
                <input type="hidden" name="_token" value={document.head.querySelector('meta[name="csrf-token"]').content}/>
                <fieldset>
                    <div className="control-group">
                        <label htmlFor="subject" className="control-label">科目名称：</label>
                        <div className="controls">
                            <input name="subjectContent" type="text" size="30" />
                        </div>
                    </div>
                    <div className="control-group">
                        <label htmlFor="subject" className="control-label" name="">知识点添加路径：</label>
                        {this.state.knowsList}
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