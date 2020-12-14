import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react'
import { Auth } from '../../rest/data/user-management';
import * as Publisher from '../../utils/pubsub/publisher';
import * as NkReactLibrary from 'nk-react-library';

export default class SignUp extends Component {
    render() {

        return (
            <div>
                <NkReactLibrary.Components.NkForm title="Sign Up" description="Get started with IsItJustMe." formConfig={[
                    {
                        id: 'email',
                        type: 'email',
                        label: 'Email',
                        description: 'This email is used for confirmation',
                        required: true
                    },
                    {
                        id: 'password',
                        type: 'password',
                        label: 'Password',
                        required: true
                    },
                    {
                        id: 'firstName',
                        type: 'input',
                        label: 'First Name',
                        required: true
                    },
                    {
                        id: 'lastName',
                        type: 'input',
                        label: 'Last Name'
                    },
                    {
                        id: 'submit',
                        type: 'submit',
                        label: 'Register'
                    }
                ]} formSubmit={(result) => {
                    console.log('submitted', result);
                    REST.SafePromise(Auth.register(result.email || '', result.password || '', result.firstName || '', result.lastName || '', 'inapp')).then((result) => {
                        console.log('auth', 'register', 'result', result);
                        Publisher.publishLoginStatusChanged();
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Sign Up Successfull', 'Welcome to Is It Just Me');
                        NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/user/me');
                    }).catch((err) => {
                        console.log('auth', 'register', 'err', err);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Sign In Failed', 'Sorry, Something went wrong.');
                    });
                }} />
            </div>
        )
    }
}
