import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm'
import { Auth } from '../../rest/data/user-management'
import safePromise from '../../rest/rest/safe.promise'
import * as Invoker from '../../utils/factory/invoker'

export default class ConfirmationToken extends Component {
    
    componentDidMount(){
        this.sendConfirmationToken();
    }

    render() {
        return (
            <div>
                <MyForm title="Account Confirmation" description="Confirm your account." formConfig={[
                    {
                        id:'token',
                        type:'number',
                        label:'Confirmation Token',
                        description:'Check your email for the confirmation token.'
                    },
                    {
                        id:'sendConfirmationToken',
                        type:'button',
                        label:'Resend Confirmation Token'
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Confirm Account'
                    }
                ]} formButtonClicked={(buttonId:string)=>{
                    if(buttonId === 'sendConfirmationToken'){
                        this.sendConfirmationToken();
                    }
                }} formSubmit={(result)=>{
                    safePromise(Auth.confirmToken(result.token)).then((result)=>{
                        console.log('ConfirmationToken','submit','result',result);
                        Invoker.createToast('Account Confirmed','Thank you for confirming your account.');
                        Invoker.redirectToURL('/user/me');
                    }).catch((error)=>{
                        console.log('ConfirmationToken','submit','error',error);
                    });
                }}/>
            </div>
        )
    }

    sendConfirmationToken() {
        safePromise(Auth.sendConfirmationToken()).then((result)=>{
            console.log('ConfirmationToken','sendConfirmationToken','result',result);
            Invoker.createToast('Confirmation Token Sent','Confirmation Token is sent to your email.');
        }).catch((error)=>{
            console.log('ConfirmationToken','sendConfirmationToken','error',error);
        });
    }
}
