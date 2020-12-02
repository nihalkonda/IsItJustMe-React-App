import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap'

export default class MyCard extends Component<{
    isLink?:boolean,
    to?:string
}> {
    render() {
        const extraProps:any = {};
        if(this.props.isLink){
            extraProps.as = Link;
            extraProps.style = {color:'initial',textDecoration:'initial'};
            extraProps.onClick = (event)=>{event.stopPropagation();};
            extraProps.to = '/';
            if(this.props.to){
                extraProps.to = this.props.to;
            }
        }
        return (
            <Card {...extraProps}>
                {this.props.children}
            </Card>
        )
    }
}
