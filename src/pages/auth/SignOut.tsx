import React, { Component } from 'react';
import MyModal from '../../components/molecules/modal/MyModal';
import { Auth } from '../../rest/data/user-management';
import Headers from '../../rest/rest/headers';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';

export default class SignOut extends Component {

    modal:MyModal;

    signOut = (everywhere:boolean=false) => {
        console.log('SignOut','signOut','everywhere',everywhere);
        safePromise(everywhere ? Auth.signOut() : Auth.signOutAll()).then((result)=>{
            console.log('SignOut','signOut','result',result);
            Publisher.publishLoginStatusChanged();
            Invoker.redirectToURL('/');
            this.modal.closeModal();
        }).catch((err)=>{
            console.log('SignOut','signOut','err',err);
        })
    }

    componentDidMount(){
        if(Headers.isUserLoggedIn()){
            this.modal.openModal();
        }else{
            Invoker.redirectToURL('/');
        }
    }

    render() {
        return (
            <div>
                <MyModal ref={(el)=>{this.modal=el;}} type='confirm' modalProps={{
                    title:'Sign Out',
                    description:'See you soon.',
                    negativeLabel:'Sign Out Everywhere',
                    positiveLabel:'Sign Out Here',
                    responseHandler:(bool:boolean)=>{
                        this.signOut(bool);
                    }
                }}>
                </MyModal>
            </div>
        )
    }
}
