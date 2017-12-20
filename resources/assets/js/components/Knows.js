import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap-table'

export default class Knows extends Component {
    componentDidMount() {
        $('#table123').bootstrapTable({
            field: 'content',
            title: '序号',
            width: "75px"
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

