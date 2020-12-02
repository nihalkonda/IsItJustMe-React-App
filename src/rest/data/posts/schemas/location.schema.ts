export default interface ILocation{
    _id:string;
    latitude:number;
    longitude:number;
    raw?:any;
    [prop:string]:any;
}