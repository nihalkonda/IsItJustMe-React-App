import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import { Auth } from '../../rest/data/user-management';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';

export default class SignUp extends Component {
    render() {

        return (
            <div>
                <MyForm title="Sign Up" description="Get started with IsItJustMe." formConfig={[
                    {
                        id:'email',
                        type:'email',
                        label:'Email',
                        description:'This email is used for confirmation'
                    },
                    {
                        id:'password',
                        type:'password',
                        label:'Password'
                    },
                    {
                        id:'firstName',
                        type:'input',
                        label:'First Name'
                    },
                    {
                        id:'lastName',
                        type:'input',
                        label:'Last Name'
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Register'
                    }
                ]} formSubmit={(result)=>{
                    console.log('submitted',result);

                    safePromise(Auth.register(result.email||'',result.password||'',result.firstName||'',result.lastName||'','inapp')).then((result)=>{
                        console.log('auth','register','result',result);
                        Publisher.publishLoginStatusChanged();
                        Invoker.createToast('Sign Up Successfull','Welcome to Is It Just Me');
                        Invoker.redirectToURL('/user/me');
                    }).catch((err)=>{
                        console.log('auth','register','err',err);
                        Invoker.createToast('Sign In Failed','Sorry, Something went wrong.');
                    });
                }}/>
            </div>
        )
    }
}
