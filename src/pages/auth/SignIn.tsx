import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import { Auth } from '../../rest/data/user-management';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';

export default class SignIn extends Component {

    render() {

        return (
            <div>
                <MyForm title="Sign In" description="Welcome back to IsItJustMe." formConfig={[
                    {
                        id:'email',
                        type:'email',
                        label:'Email',
                        defaultValue:'nihal+test2@isitjustme.info',
                        required:true
                    },
                    {
                        id:'password',
                        type:'password',
                        label:'Password',
                        defaultValue:'strong',
                        required:true
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Login'
                    }
                ]} formSubmit={(result)=>{
                    console.log('submitted',result);
                    
                    safePromise(Auth.login(result.email||'',result.password||'')).then((result)=>{
                        console.log('auth','login','result',result);
                        Publisher.publishLoginStatusChanged();
                        Invoker.createToast('Sign In Successfull','Welcome back to Is It Just Me');
                        Invoker.redirectToURL('/user/me');
                    }).catch((err)=>{
                        console.log('auth','login','err',err);
                        Invoker.createToast('Sign In Failed','Sorry, Something went wrong.');
                    });
                }}/>
            </div>
        )
    }
}
