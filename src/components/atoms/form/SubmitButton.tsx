import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import {config} from './Types';

export default class SubmitButton extends Component<config> {
    render() {
        return (
            <Button className={this.props.inline?"d-inline":""} variant="primary" type="submit" data-id={this.props.id} style={{margin:10}} value={this.props.defaultValue} onClick={()=>{this.props.valueChanged(this.props.id,this.props.defaultValue)}}>
                {this.props.label||'Submit'}
            </Button>
        )
    }
}
