import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import factory from '../../utils/factory';
import binderKey from '../../utils/factory/binder.key';
export default class MyRedirect extends Component{
    state={
        redirect:null,
        time:0
    };

    componentDidMount(){
        factory.bindFunction(binderKey.REDIRECT_URL,(url)=>{
            this.setState({redirect:url,time:new Date().getTime()})
        })
    }

    render() {
        console.log('MyRedirect','redirect',this.state.redirect, this.state.time);
        if(this.state.redirect)
            return <Redirect to={this.state.redirect} key={this.state.time} push/>
        return <span></span>
    }
}
