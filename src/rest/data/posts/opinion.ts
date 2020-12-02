import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';
import { IUser } from '../user-management/user';
import {ILocation} from './schemas';

interface IOpinion{
    _id:string;
    author:IUser;
    body:string;
    postId:string;
    commentId:string;
    opinionType:string;
    location:ILocation;
    createdAt:any;
    //[prop:string]:any;
}

class Opinion extends RESTObject<IOpinion>{

    constructor(){
        super(API.OPINION);
        this.overloadables.init = () => {
            this.setData({
                _id:'',
                author:{
                    _id:'',
                    userId:'',
                    email:'',
                    firstName:'',
                    lastName:'',
                    displayPicture:''
                },
                body:'',
                postId:'',
                commentId:'',
                opinionType:'upvote',
                location:{
                    _id:'',
                    latitude:0.0,
                    longitude:0.0
                },
                createdAt:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Opinion();
        }

        this.overloadables.creationPacket = () => {
            let extras:any = {};
            if(this.data.location.raw){
                extras.location = {
                    latitude:this.data.location.latitude||0.0,
                    longitude:this.data.location.longitude||0.0,
                    raw:this.data.location.raw
                };
            }
            if(this.data.body){
                extras.body=this.data.body;
            }
            return {
                opinionType:this.data.opinionType||'',
                ...extras
            }
        }
    
        this.overloadables.updationPacket = () => {
            throw new Error('Option is not updatable.');
        }

        this.overloadables.init();
    }

    get_id(){
        return this.data._id;
    }

    set_id(_id:string){
        this.data._id = _id;
    }

}

export type{
    IOpinion
}

export {
    Opinion
}