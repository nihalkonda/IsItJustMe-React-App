import { Services } from 'nk-js-library';
import Topic from './topic';

// const createToast = (title:string,body:string) => { 
//     PubSub.publishMessage(Topic.TOAST.NEW_MESSAGE,{title,body});
// }

const publishLoginStatusChanged = () => {
    Services.PubSubService.Organizer.publishMessage({
        type: Topic.AUTH.LOGIN_STATUS_CHANGED,
        data: {}
    });
}

const publishTokenExpired = () => {
    Services.PubSubService.Organizer.publishMessage({
        type: Topic.AUTH.TOKEN_EXPIRED,
        data: {}
    });
}

// const redirectToURL = (url:string) => {
//     PubSub.publishMessage(Topic.ROUTER.REDIRECT,url);
// }

const commentCreated = () => {
    Services.PubSubService.Organizer.publishMessage({
        type: Topic.COMMENT.CREATED,
        data: {}
    });
}

const opinionCreated = () => {
    Services.PubSubService.Organizer.publishMessage({
        type: Topic.OPINION.CREATED,
        data: {}
    });
}

export {
    //createToast,
    publishLoginStatusChanged,
    publishTokenExpired,
    //redirectToURL,
    commentCreated,
    opinionCreated
}