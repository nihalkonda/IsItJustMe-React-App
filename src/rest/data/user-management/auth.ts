//import * as RestOperations from '../../rest/rest.operations';
//import Headers from '../../rest/headers';
import { API } from '../../rest/api';
//import Factory from '../../../utils/factory';
import { Services } from 'nk-js-library';
import { REST } from 'nk-rest-js-library';

const register = async function (email: string, password: string, firstName: string, lastName: string, registrationType: string) {

    return REST.RESTOperations.postOp(API.AUTH.SIGN_UP, { email, password, firstName, lastName, registrationType }).then((result) => {

        console.log('Register Result', result.data);
        REST.Headers.setUserId(result.data.userId);
        REST.Headers.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
        REST.Headers.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
        REST.Headers.setUserConfirmed(result.data.isConfirmed);
        REST.Headers.backupData();

        return result;
    })
}

const login = async function (email: string, password: string) {

    return REST.RESTOperations.postOp(API.AUTH.SIGN_IN, { email, password }).then((result) => {

        console.log('Login Result', result.data);
        REST.Headers.setUserId(result.data.userId);
        REST.Headers.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
        REST.Headers.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
        REST.Headers.setUserConfirmed(result.data.isConfirmed);
        REST.Headers.backupData();

        return result;
    })

}

const getMe = async function () {
    return REST.RESTOperations.getOp(API.AUTH.ME);
}

const getAccessToken = async function () {
    console.log('Auth', 'getAccessToken', API.AUTH.ACCESS_TOKEN)
    return REST.RESTOperations.getOp(API.AUTH.ACCESS_TOKEN, true).then((result) => {

        console.log('getAccessToken Result', result.data);
        REST.Headers.setUserId(result.data.userId);
        REST.Headers.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
        REST.Headers.setUserConfirmed(result.data.isConfirmed);
        REST.Headers.backupData();

        return result;
    });
}

const sendConfirmationToken = async function () {
    return REST.RESTOperations.getOp(API.AUTH.SEND_CONFIRMATION_TOKEN);
}

const confirmToken = async function (token: string) {
    return REST.RESTOperations.postOp(API.AUTH.CONFIRMATION_TOKEN, { token }).then((result) => {

        console.log('confirmToken Result', result.data);
        REST.Headers.setUserId(result.data.userId);
        REST.Headers.setAccessToken(result.data.accessToken.value, result.data.accessToken.expiryTime);
        REST.Headers.setRefreshToken(result.data.refreshToken.value, result.data.refreshToken.expiryTime);
        REST.Headers.setUserConfirmed(result.data.isConfirmed);
        REST.Headers.backupData();

        return result;
    })
}

const signOut = async function () {
    return REST.RESTOperations.deleteOp(API.AUTH.SIGN_OUT, true).then((result) => {

        console.log('SignOut Result', result.data);
        REST.Headers.setUserId('');
        REST.Headers.setAccessToken('', 0);
        REST.Headers.setRefreshToken('', 0);
        REST.Headers.setUserConfirmed(false);
        REST.Headers.backupData();

        return result;
    })
}

const signOutAll = async function () {
    return REST.RESTOperations.deleteOp(API.AUTH.SIGN_OUT_ALL, true).then((result) => {

        console.log('SignOutAll Result', result.data);
        REST.Headers.setUserId('');
        REST.Headers.setAccessToken('', 0);
        REST.Headers.setRefreshToken('', 0);
        REST.Headers.setUserConfirmed(false);
        REST.Headers.backupData();

        return result;
    })
}

Services.BinderService.bindFunction('AUTH_GET_ACCESS_TOKEN', getAccessToken);

export {
    register,
    login,
    getMe,
    getAccessToken,
    sendConfirmationToken,
    confirmToken,
    signOut,
    signOutAll
}