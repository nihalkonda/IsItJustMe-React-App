export default interface IStats{
    _id:string;
    followCount:number;
    upvoteCount:number;
    downvoteCount:number;
    spamreportCount:number;
    viewCount:number;
    commentCount:number;
    updateCount:number;
    resolveCount:number;
    score:number;
    [prop:string]:any;
}