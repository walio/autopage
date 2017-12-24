import React, { Component } from 'react';

export default class AddKnows extends Component{
    constructor (){
        super()
        this.state = {
            knowsList: "",
            content: ""
        }
    }
    componentDidMount(){
        axios.get(`/api/knows/`+GetQueryString('knowsid')).then((res)=>{
            let knows = res.data.parentKnows.map((value,index,array)=>{
                return value.content+"/"
            })
            knows = <div>{knows}<input type="hidden" name="originalContent" value={res.data.selfKnows.content}/></div>
            this.setState({knowsList: knows,content:res.data.selfKnows.content})
        })
    }
    render () {
        return (
            <form action={`/api/knows/`+GetQueryString('knowsid')} method="put" className="form-horizontal" data-forward={"/knows?parentknowsid="+GetQueryString('knowsid')}>
                <input type="hidden" name="_token" value={document.head.querySelector('meta[name="csrf-token"]').content}/>
                <fieldset>
                    <div className="control-group">
                        <label className="control-label">科目名称：</label>
                        <div className="controls">
                            <input name="modifiedContent" type="text" size="30" value={this.state.content} onChange={(e)=>this.setState({ content: e.target.value })}/>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label">知识点添加路径：</label>
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