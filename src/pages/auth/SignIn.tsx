import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react'
import { Auth } from '../../rest/data/user-management';
import * as Publisher from '../../utils/pubsub/publisher';
import * as NkReactLibrary from 'nk-react-library';

export default class SignIn extends Component {

    render() {

        return (
            <div>
                <NkReactLibrary.Components.NkForm title="Sign In" description="Welcome back to IsItJustMe." formConfig={[
                    {
                        id: 'email',
                        type: 'email',
                        label: 'Email',
                        required: true
                    },
                    {
                        id: 'password',
                        type: 'password',
                        label: 'Password',
                        required: true
                    },
                    {
                        id: 'submit',
                        type: 'submit',
                        label: 'Login'
                    }
                ]} formSubmit={(result) => {
                    console.log('submitted', result);
                    REST.SafePromise(Auth.login(result.email || '', result.password || '')).then((result) => {
                        console.log('auth', 'login', 'result', result);
                        Publisher.publishLoginStatusChanged();
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Sign In Successfull', 'Welcome back to Is It Just Me');
                        NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/user/me');
                    }).catch((err) => {
                        console.log('auth', 'login', 'err', err);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Sign In Failed', 'Sorry, Something went wrong.');
                    });
                }} />
            </div>
        )
    }
}
