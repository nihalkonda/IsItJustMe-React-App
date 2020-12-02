import React, { Component } from 'react'
import {Form} from 'react-bootstrap';
import {config} from './Types';

export default class SimpleInput extends Component<config> {
    render() {
        let attrs:any = {type:this.props.type||'text'};
        
        if(this.props.isTextarea || this.props.type === 'textarea'){
            attrs = {as:'textarea',rows:'5',cols:'20'};
        }

        return (
            <Form.Group style={{
                maxWidth:600
            }} controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control 
                    style={{maxWidth:600}} 
                    {...attrs}
                    placeholder={this.props.placeholder} 
                    defaultValue={this.props.defaultValue} 
                    required={this.props.required||false}
                    onChange={(event)=>{
                        this.props.valueChanged(this.props.id,event.target.value);
                    }}
                />
                <Form.Text className="text-muted">{this.props.description}</Form.Text>
            </Form.Group>
        )
    }
}
