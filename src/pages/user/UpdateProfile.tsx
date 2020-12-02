import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import { User } from '../../rest/data/user-management';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';

export default class UpdateProfile extends Component {
    state = {
        data:null
    };

    user:User;

    componentDidMount(){
        this.user = new User();
        safePromise(this.user.getMe()).then((result)=>{
            console.log('User','Me','result',result);
            this.setState({data:this.user.data});
        }).catch((err)=>{
            console.log('User','Me','err',err);
        })    
    }
    render() {
        if(!this.state.data){
            return <div></div>
        }
        return (
            <div>
                <MyForm title="Update Profile" description="Update your profile." formConfig={[
                    {
                        id:'firstName',
                        type:'input',
                        label:'First Name',
                        defaultValue:this.state.data.firstName
                    },
                    {
                        id:'lastName',
                        type:'input',
                        label:'Last Name',
                        defaultValue:this.state.data.lastName
                    },
                    {
                        id:'displayPicture',
                        type:'input',
                        label:'Display Picture URL',
                        defaultValue:this.state.data.displayPicture
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Update Profile'
                    }
                ]} formSubmit={(result)=>{
                    console.log('submitted',result);

                    this.user.data.firstName = result.firstName;
                    this.user.data.lastName = result.lastName;
                    this.user.data.displayPicture = result.displayPicture;

                    safePromise(this.user.update()).then((result)=>{
                        console.log('UpdateProfile','formSubmit','update','result',result);
                        Invoker.createToast('Profile Updated','Your profile is updated.');
                        Invoker.redirectToURL('/user/me');
                    }).catch((error)=>{
                        console.log('UpdateProfile','formSubmit','update','error',error);
                        Invoker.createToast('Profile Update Failed','Your profile update has failed.');
                    })

                }}/>
            </div>
        )
    }
}
