
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route,BrowserRouter} from 'react-router-dom';
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import './bootstrap'
import Sidebar from './components/Sidebar.jsx'
import Main from './components/Main'
/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function App (props) {
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
                        <BrowserRouter>
                            <Route path="/view" component={Main}/>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        )}


ReactDOM.render(<App />, document.getElementById('main'));


