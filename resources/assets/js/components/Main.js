
import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx'


export default class Main extends Component {
    constructor (){
        super()
        this.state = {
            data: false
        }
    }
    componentDidMount(){
        axios.get('/api/questions').then((res)=>{
            this.setState({data:res.data})
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar/>
                    </div>
                    <div className="col-md-10">
                        <ul className="breadcrumb">
                            <li>test</li>
                            <li>test</li>
                        </ul>
                        {
                            React.Children.map(this.props.children, function (child) {
                                return <li>{child}</li>;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}