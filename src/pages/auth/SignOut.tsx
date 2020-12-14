import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react';
import { Auth } from '../../rest/data/user-management';
import * as Publisher from '../../utils/pubsub/publisher';
import * as NkReactLibrary from 'nk-react-library';

export default class SignOut extends Component {

    signOut = (everywhere: boolean = false) => {
        console.log('SignOut', 'signOut', 'everywhere', everywhere);
        REST.SafePromise(everywhere ? Auth.signOut() : Auth.signOutAll()).then((result) => {
            console.log('SignOut', 'signOut', 'result', result);
            Publisher.publishLoginStatusChanged();
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/');
            //this.modal.closeModal();
        }).catch((err) => {
            console.log('SignOut', 'signOut', 'err', err);
        })
    }

    componentDidMount() {
        if (REST.Headers.isUserLoggedIn()) {
            //this.modal.openModal();
            NkReactLibrary.Utils.NkReactUtils.Modal.confirm({
                title: 'Sign Out',
                description: 'See you soon.',
                negativeLabel: 'Sign Out Everywhere',
                positiveLabel: 'Sign Out Here'
            }).then((result) => {
                this.signOut(result);
            })
        } else {
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/');
        }
    }

    render() {
        return (
            <div />
        )
    }
}
