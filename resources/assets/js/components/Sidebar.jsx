import React from 'react';

export default (props) => (
        <div>
            <div className="panel-group" id="accordion">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                               href="#collapseOne">
                                试题管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" className="panel-collapse collapse">
                        <ul className="list-group panel-body">
                            <li><a href="">科目管理</a></li>
                            <li><a href="">题型管理</a></li>
                            <li><a href="">有效题目管理</a></li>
                            <li><a href="">停用题目管理</a></li>
                        </ul>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion"
                               href="#collapseTwo">
                                试卷管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse">
                        <ul className="list-group panel-body">
                            <li><a href="">试卷类型</a></li>
                            <li><a href="">随机组卷</a></li>
                            <li><a href="">试卷列表</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
