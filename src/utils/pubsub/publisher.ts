import {PubSub,Topic} from '.';

// const createToast = (title:string,body:string) => { 
//     PubSub.publishMessage(Topic.TOAST.NEW_MESSAGE,{title,body});
// }

const publishLoginStatusChanged = () => {
    PubSub.publishMessage(Topic.AUTH.LOGIN_STATUS_CHANGED,{});
}

const publishTokenExpired = () => {
    PubSub.publishMessage(Topic.AUTH.TOKEN_EXPIRED,{});
}

// const redirectToURL = (url:string) => {
//     PubSub.publishMessage(Topic.ROUTER.REDIRECT,url);
// }

const commentCreated = () => {
    PubSub.publishMessage(Topic.COMMENT.CREATED,{});
}

const opinionCreated = () => {
    PubSub.publishMessage(Topic.OPINION.CREATED,{});
}

export {
    //createToast,
    publishLoginStatusChanged,
    publishTokenExpired,
    //redirectToURL,
    commentCreated,
    opinionCreated
}