import React, { Component } from 'react'
import { Auth } from '../../rest/data/user-management'
import * as NkReactLibrary from 'nk-react-library';
import { REST } from 'nk-rest-js-library';

export default class ConfirmationToken extends Component {

    componentDidMount() {
        this.sendConfirmationToken();
    }

    render() {
        return (
            <div>
                <NkReactLibrary.Components.NkForm title="Account Confirmation" description="Confirm your account." formConfig={[
                    {
                        id: 'token',
                        type: 'number',
                        label: 'Confirmation Token',
                        description: 'Check your email for the confirmation token.'
                    },
                    {
                        id: 'sendConfirmationToken',
                        type: 'button',
                        label: 'Resend Confirmation Token'
                    },
                    {
                        id: 'submit',
                        type: 'submit',
                        label: 'Confirm Account'
                    }
                ]} formButtonClicked={(buttonId: string) => {
                    if (buttonId === 'sendConfirmationToken') {
                        this.sendConfirmationToken();
                    }
                }} formSubmit={(result) => {
                    REST.SafePromise(Auth.confirmToken(result.token)).then((result) => {
                        console.log('ConfirmationToken', 'submit', 'result', result);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Account Confirmed', 'Thank you for confirming your account.');
                        NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/user/me');
                    }).catch((error) => {
                        console.log('ConfirmationToken', 'submit', 'error', error);
                    });
                }} />
            </div>
        )
    }

    sendConfirmationToken() {
        REST.SafePromise(Auth.sendConfirmationToken()).then((result) => {
            console.log('ConfirmationToken', 'sendConfirmationToken', 'result', result);
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Confirmation Token Sent', 'Confirmation Token is sent to your email.');
        }).catch((error) => {
            console.log('ConfirmationToken', 'sendConfirmationToken', 'error', error);
        });
    }
}
