import * as RestOperations from './rest.operations';

export default class RESTObject<T>{

    private api:Function;

    data:T;

    overloadables = {
        init: ():any => {
            this.data = <T> {};
        },
        newInstance: ():RESTObject<T> => {
            return null;
        },
        loadPartialContent: (preview:object):any => {
            //console.log('loadPartialContent',preview);
            this.setData(this.copyJSON(this.getData(),preview));
        },
        formulateCreateUrl: ():string => {
            return this.api();
        },
        formulateReadUrl: (full:boolean=false):string => {
            return this.api()+'/'+this.data["_id"]+(full?'?full=true':'');
        },
        formulateSearchUrl: (pageSize:number,pageNum:number):string => {
            return this.api()+"/search?pageSize="+pageSize+"&pageNum="+pageNum;
        },
        formulateUpdateUrl: ():string => {
            return this.api()+'/'+this.data["_id"];
        },
        formulateDeleteUrl: ():string => {
            return this.api()+'/'+this.data["_id"];
        },
        creationPacket: ():any => {
            return this.data;
        },
        updationPacket: ():any => {
            return this.data;
        }
    };

    //searchRestObject:SearchRESTObject<T>;

    constructor(api:string|Function){
        if(api.constructor === ''.constructor)
            this.api = function(){return api};
        else
            this.api = <Function> api;
        //this.searchRestObject = new SearchRESTObject(this);
        this.overloadables.init();
    }

    getApi(){
        return this.api;
    }

    getData(){
        return this.data;
    }

    // setApi(api:string){
    //     this.api = api;
    //     return this.getApi();
    // }

    setData(data:T){
        this.data = data;
        return this.getData();
    }

    copyJSON(target:T,source:object){
        //console.log(target,source);
        for(const k of Object.keys(source)){
            target[k] = ((source[k] !== null) && (source[k] !== undefined) && source[k].constructor.name === 'Object') ? this.copyJSON(target[k]||{},source[k]) : source[k];
        }
        return target;
    }

    

    async create(){
        console.log('POST',this.overloadables.formulateReadUrl(),this.overloadables.creationPacket());
        // this.data = <T> ((await RestOperations.postOp(this.api,this.overloadables.creationPacket())).data);
        this.overloadables.loadPartialContent((await RestOperations.postOp(this.overloadables.formulateReadUrl(),this.overloadables.creationPacket())).data);
    }

    async read(full:boolean=false){
        console.log('GET',this.overloadables.formulateReadUrl(full),this.data["_id"]);
        this.overloadables.loadPartialContent((await RestOperations.getOp(this.overloadables.formulateReadUrl(full))).data);
    }

    async update(){
        console.log('PUT',this.overloadables.formulateUpdateUrl(),this.overloadables.updationPacket());
        this.overloadables.loadPartialContent((await RestOperations.putOp(this.overloadables.formulateUpdateUrl(),this.overloadables.updationPacket())).data);
    }

    async delete(){
        console.log('DELETE',this.overloadables.formulateDeleteUrl(),this.data["_id"]);
        this.overloadables.loadPartialContent((await RestOperations.deleteOp(this.overloadables.formulateDeleteUrl())).data);
    }

    // async search(data:{query?:object,sort?:object,pageSize?:number,pageNum?:number,attributes?:object} = {}){
    //     return await this.searchRestObject.search(data);
    // }
}