import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Modal() {
        return (
            <div>
                <div id="failModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        </div>
                    </div>
                </div>
            </div>
        );
    }


if (document.getElementById('modal')) {
    ReactDOM.render(<Modal />, document.getElementById('modal'));
}
