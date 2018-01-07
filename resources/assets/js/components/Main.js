
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

        // axios.get('/api/knows?fields=children').then((res)=>{
        //     this.setState({data:res.data})
        // })
    }
    fetch(url){
        // fixme: antd render components twice, so this executes 2 times
        axios.get(url).then((res)=>{
            this.setState({data:res.data})
        })
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/view/knows" component={()=><Knows {...this.props} {...this.state}/>}/>
                    <Route path="/view/addKnows" component={AddKnows}/>
                    <Route path="/view/modifyKnows" component={ModifyKnows}/>
                    <Route path="/view/questions" component={()=><Questions {...this.state} fetch={this.fetch.bind(this)}/>}/>
                    <Route path="/view/modifyQuestion" component={()=><ModifyQuestions {...this.state} type="modify" fetch={this.fetch.bind(this)}/>}/>
                    <Route path="/view/addQuestion" component={()=><ModifyQuestions {...this.state} type="add" data={{stem:"",options:[""],digest:""}}/>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}