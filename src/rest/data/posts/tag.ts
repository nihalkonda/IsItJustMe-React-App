import { API } from '../../rest/api';
import RESTObject from '../../rest/rest.object';

interface ITag{
    _id?:string;
    tag:string;
    count?:number;
}

class Tag extends RESTObject<ITag>{

    constructor(){
        super(API.TAG);
        this.overloadables.init = () => {
            this.setData({
                _id:'',
                tag:'',
                count:0
            });
        };

        this.overloadables.newInstance = () => {
            return new Tag();
        }

        this.overloadables.creationPacket = () => {
            throw new Error('Cannot Create a Tag');
        }
    
        this.overloadables.updationPacket = () => {
            throw new Error('Cannot Update a Tag');
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
    ITag
}

export {
    Tag
}