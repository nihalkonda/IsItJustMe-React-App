import React, { Component } from 'react'

export default class MyContainer extends Component {
    render() {
        //@ts-ignore
        return <nk-container>{this.props.children}</nk-container>
    }
}
