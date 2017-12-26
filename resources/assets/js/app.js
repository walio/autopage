
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route,BrowserRouter} from 'react-router-dom';
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import './bootstrap'
import Main from './components/Main'
import Knows from './components/Know/Knows.jsx'
import AddKnows from './components/Know/AddKnows'
import ModifyKnows from './components/Know/ModifyKnows'
import Questions from './components/Question/Questions'
import ModifyQuestions from "./components/Question/ModifyQuestions";
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function App (props) {
    return (
        <BrowserRouter>
            <Route path="/view" component={Main}>
                <Route path="/knows" component={Knows}/>
                <Route path="/addKnows" component={AddKnows}/>
                <Route path="/modifyKnows" component={ModifyKnows}/>
                <Route path="/questions" component={Questions}/>
                <Route path="/modifyQuestions" component={ModifyQuestions}/>
            </Route>
        </BrowserRouter>
        )}


ReactDOM.render(<App />, document.getElementById('main'));


