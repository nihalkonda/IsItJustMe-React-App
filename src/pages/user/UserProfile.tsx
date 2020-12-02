import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { User } from '../../rest/data/user-management';
import UserProfile from '../../components/molecules/fullview/UserProfile';
import safePromise from '../../rest/rest/safe.promise';

export default class MyProfile extends Component<{
    [key:string]:any
}> {
    state = {
        loaded:0
    };

    user:User;

    componentDidMount(){
        this.user = new User();
        console.log(this.props);
        this.user.data._id = this.props.match.params.userId;
        safePromise(this.user.read()).then((result)=>{
            console.log('User','Me','result',result);
            this.setState({loaded:new Date().getTime()});
        }).catch((err)=>{
            console.log('User','Me','err',err,'name',err.name,'message',err.message,'response',err.response);
        })
    }
    render() {
        if(!this.state.loaded){
            return <div></div>
        }

        return (
            <div>
                <UserProfile {...this.user.data}/>
            </div>
        )
    }
}
