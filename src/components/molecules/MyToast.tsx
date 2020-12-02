import React, { Component } from 'react'
import {Toast} from 'react-bootstrap';
export default class MyToast extends Component<{
    title:string,
    body?:string,
    disappearIn?:number
}> {
    state={
        show:true
    };
    render() {
        if(this.props.disappearIn<0)
            return <span></span>;
        return (
            <Toast 
                style={{minWidth:300}} 
                onClose={() => this.setState({show:false})} 
                show={this.state.show} 
                delay={this.props.disappearIn||3000} 
                autohide>
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto" >{this.props.title}</strong>
                </Toast.Header>
                <Toast.Body>
                    {this.props.body.split('\n').map(s=><span>{s}<br/></span>)}
                </Toast.Body>
            </Toast>
        )
    }
}
