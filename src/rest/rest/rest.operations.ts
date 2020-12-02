import axios from 'axios';
import Headers from './headers';
import Factory from '../../utils/factory';
import Strings from '../../utils/Strings';

const restOptions = function(refresh:boolean=false){
    let auth = 'Access '+Headers.getAccessToken().value;
    if(refresh)
        auth = 'Refresh '+Headers.getRefreshToken().value;
    return {
        headers:{
            'Authorization':auth,
            'Content-Type': 'application/json'
        },
        happy:0
    }
}

function throwError(s,e){
    const error = new Error();
    error.message = e.constructor === ''.constructor ? e : JSON.stringify(e);
    error.name = s.toString();
    throw error;
}

function deconstructError(error){
    let name = '503';
    let message = 'Service Unavailable';
    console.log(error,error.response,error.name,error.message)
    if(error.response){
        name = error.response.status+'';
        message = error.response.data;
    }else if(error.name){
        name = error.name;
        message = error.message;
    }
    return {name,message};
}

const httpOp = async function(method:string='get',url:string,data:any,refresh:boolean=false){
    for(let i=0;i<5;i++){
        console.log('httpOp','i',i);
        try {
            if(method === 'post')
                return await axios.post(url,data,restOptions(refresh));
            if(method === 'get')
                return await axios.get(url,restOptions(refresh));
            if(method === 'put')
                return await axios.put(url,data,restOptions(refresh));
            if(method === 'delete')
                return await axios.delete(url,restOptions(refresh));
        } catch (error) {
            
            const {name,message} = deconstructError(error);
            
            if(name === '401'){
                console.log('name',name,message);
                throwError(name,message);
            }

            if(name === '403'){
                if(error.response.data.errorCode === 'ACCESS_TOKEN_EXPIRED'){
                    try {
                        console.log('Factory','boundFunction','AUTH_GET_ACCESS_TOKEN',Factory.boundFunction('AUTH_GET_ACCESS_TOKEN'))
                        await (Factory.boundFunction('AUTH_GET_ACCESS_TOKEN')());
                        continue;
                    } catch (error) {
                        console.log('error',error,error.name,error.message);
                        const {name,message} = deconstructError(error);
    
                        Headers.setAccessToken('',0);
                        Headers.setRefreshToken('',0);
                        Headers.setUserConfirmed(false);
                        Headers.backupData();
    
                        throwError(name,message);
                    }
                }else if(error.response.data.errorCode === 'REFRESH_TOKEN_EXPIRED'){
                    throwError('403',Strings.ERROR.REFRESH_TOKEN_EXPIRED);
                }else{
                    throwError(name,message);
                }
            }else{
                throwError(name,message);
            }
        }
        return {data:{}};
    }
    return {data:{}};
}

const postOp = async function(url:string,data:any,refresh:boolean=false){
    return httpOp('post',url,data,refresh);
};

const getOp = async function(url:string,refresh:boolean=false){
    return httpOp('get',url,null,refresh);
};

const putOp = async function(url:string,data:any,refresh:boolean=false){
    return httpOp('put',url,data,refresh);
};

const deleteOp = async function(url:string,refresh:boolean=false){
    return httpOp('delete',url,null,refresh);
}

export {
    postOp,
    getOp,
    putOp,
    deleteOp
}