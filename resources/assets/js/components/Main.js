
import React, { Component } from 'react';
import { Route,BrowserRouter,Switch} from 'react-router-dom';


import Knows from './Know/Knows.jsx'
import AddKnows from './Know/AddKnows'
import ModifyKnows from './Know/ModifyKnows'
import Questions from './Question/Questions'
import ModifyQuestions from "./Question/ModifyQuestions";


export default class Main extends Component {
    constructor (){
        super()
        this.state = {
            data: false
        }
    }
    componentDidMount(){
        axios.get('/api/questions').then((res)=>{
            this.setState({data:res.data[0]})
        })
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/view/knows" component={Knows}/>
                    <Route path="/view/addKnows" component={AddKnows}/>
                    <Route path="/view/modifyKnows" component={ModifyKnows}/>
                    <Route path="/view/questions" component={Questions}/>
                    <Route path="/view/modifyQuestions" component={()=><ModifyQuestions {...this.props} {...this.state}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}