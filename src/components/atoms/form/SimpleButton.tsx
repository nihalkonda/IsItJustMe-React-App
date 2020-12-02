import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import {config} from './Types';

export default class SimpleButton extends Component<config> {
    render() {
        return (
            <Button className={this.props.inline?"d-inline":""} variant="primary" type="button" data-id={this.props.id} onClick={()=>{this.props.formButtonClicked(this.props.id);}} style={{margin:10}}>
                {this.props.label||'Button'}
            </Button>
        )
    }
}
