import Strings from "../../utils/Strings";
import * as Invoker from '../../utils/factory/invoker';

export default function(promise:Promise<any>){
    console.log('safe.promise',promise);
    return new Promise((resolve,reject)=>{
        promise.then((result)=>{
            console.log('safe.promise','result',result);
            resolve(result);
        }).catch((error)=>{
            console.log('safe.promise','error',error);
            
            let errorCode;
            
            try {
                errorCode = JSON.parse(error.message).errorCode;
                console.log('safe.promise','errorCode',errorCode);
            } catch (error) {
                console.error(error)
            }

            if(errorCode === Strings.ERROR.CODE.UNAUTHORIZED){
                Invoker.createToast('Sign In Required','Please sign in before the operation.');
                Invoker.redirectToURL('/auth/sign_in');
            }else if(errorCode === Strings.ERROR.CODE.REFRESH_TOKEN_EXPIRED){
                Invoker.createToast('Sign In Required','Sorry, your token has expired.');
                Invoker.redirectToURL('/auth/sign_in');
            }else if(errorCode === Strings.ERROR.CODE.USER_UNCONFIRMED){
                console.log('safe.promise','redirect');
                Invoker.createToast('User Confirmation','Please confirm your account first.');
                Invoker.redirectToURL('/auth/confirmation_token');
            }else if(error.message === Strings.ERROR.NETWORK_ERROR){
                console.log('safe.promise','redirect');
                Invoker.redirectToURL('/oops');
            }else{
                reject(error);
            }
        })
    })
}