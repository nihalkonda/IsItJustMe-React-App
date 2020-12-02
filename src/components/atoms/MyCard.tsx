import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap'

export default class MyCard extends Component<{
    isLink?:boolean,
    to?:string,
    style?:any
}> {
    render() {
        const extraProps:any = {};
        if(this.props.isLink){
            extraProps.as = Link;
            extraProps.style = {color:'initial',textDecoration:'initial',display:'inline-block',...this.props.style};
            extraProps.onClick = (event)=>{event.stopPropagation();};
            extraProps.to = '/';
            if(this.props.to){
                extraProps.to = this.props.to;
            }
        }
        return (
            <div>
                <Card {...extraProps}>
                    {this.props.children}
                </Card>
            </div>
        )
    }
}
