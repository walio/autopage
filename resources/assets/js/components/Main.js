import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Questions from './Question/Questions';
import ModifyQuestions from './Question/ModifyQuestions';


export default class Main extends Component {
    constructor() {
        super();
        this.fetch = url => {
            axios.get(url).then(res => {
                this.setState({ data: res.data });
            });
        };
        this.state = {
            data: false,
        };
    }
    render() {
        const data = { stem: '', options: [''], digest: '' };
        return (
            <Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route path="/view/questions" component={() => <Questions {...this.state} fetch={this.fetch} />} />
                        <Route path="/view/modifyQuestion" component={() => <ModifyQuestions {...this.state} fetch={this.fetch} />} />
                        <Route path="/view/addQuestion" component={() => <ModifyQuestions data={data} />} />
                    </Switch>
                </BrowserRouter>
            </Fragment>
        );
    }
}
