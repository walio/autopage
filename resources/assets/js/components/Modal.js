import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Modal() {
        return (
            <div>
                <div className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            ...
                        </div>
                    </div>
                </div>
            </div>
        );
    }


if (document.getElementById('modal')) {
    ReactDOM.render(<Modal />, document.getElementById('modal'));
}
