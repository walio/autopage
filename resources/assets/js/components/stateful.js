import React, { Component } from 'react';

export default (url) => (component) =>
    class w extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: ""
            }
        }
        render() {
            return <component {...this.props}/>
        }
}
