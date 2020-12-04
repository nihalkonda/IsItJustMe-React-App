import { Button } from "react-bootstrap";
import { Opinion } from "../rest/data/posts";
import headers from "../rest/rest/headers";
import safePromise from "../rest/rest/safe.promise";
import SearchRESTObject from "../rest/rest/search.rest.object";

import * as Invoker from '../utils/factory/invoker';
import * as Publisher from '../utils/pubsub/publisher';

export function stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export function timeSince (date:Date) {
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const isPast = seconds>0;
    seconds = (isPast?1:-1)*seconds;
    console.log('nkLogTimeSince',seconds,isPast);
    var interval = seconds / 31536000;
    const val = (num:number,suf:string) => {
        return `${num} ${suf}${num>1?'s':''} `+(isPast?'ago':'from now');
    }
    if (interval > 1) {
        return val(Math.floor(interval),'year');
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return val(Math.floor(interval),'month');
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return val(Math.floor(interval),'day');
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return val(Math.floor(interval),'hour');
    }
    interval = seconds / 60;
    if (interval > 1) {
        return val(Math.floor(interval),'minute');
    }
    return val(Math.floor(seconds),'second');
  }

export function saveLocation(latitude, longitude) {
    localStorage.setItem("location", JSON.stringify({ latitude, longitude }));
}

export function getLocation() {
    try {
        const { latitude, longitude } = JSON.parse(localStorage.getItem("location"));
        return { latitude, longitude };
    } catch (error) {

    }
    return { latitude: null, longitude: null };
}

// export async function opinionButtons({ postId, commentId, postAuthorView }: {
//     postId: string,
//     commentId?: string,
//     postAuthorView: boolean
// }) {

//     type opinionType = 'follow'|'upvote'|'downvote'|'spamreport'

//     const result:{
//         //@ts-ignore
//         [key : opinionType] : {
//             label:string,
//             onClick:Function,
//             positive:boolean
//         }
//     } = {};

//     try {
//         const opinion = new Opinion();
//         opinion.data.postId = postId;
//         if (commentId) {
//             opinion.data.commentId = commentId;
//         }
//         const searchRestObject = new SearchRESTObject(opinion);
//         searchRestObject.request.query = {
//             "author": headers.getUserId()
//         };

//         await safePromise(searchRestObject.search())

//         const createOpinion = (opinionType: string) => {
//             opinion.data.body = '';
//             opinion.data._id = '';
//             opinion.data.opinionType = opinionType;

//             const { latitude, longitude } = getLocation();

//             opinion.data.location.latitude = latitude;
//             opinion.data.location.longitude = longitude;

//             safePromise(opinion.create()).then(() => {
//                 Invoker.createToast('Opinion Created', '');
//                 Publisher.opinionCreated();
//                 this.loadOpinions();
//             }).catch(() => {
//                 Invoker.createToast('Opinion Creation Failed', '');
//             })
//         }

//         const deleteOpinion = (_id: string) => {
//             this.opinion.data._id = _id;
//             safePromise(this.opinion.delete()).then(() => {
//                 Invoker.createToast('Opinion Deleted', '');
//                 Publisher.opinionCreated();
//                 this.loadOpinions();
//             }).catch(() => {
//                 Invoker.createToast('Opinion Deletion Failed', '');
//             })
//         }

//         let opinions = this.searchRestObject.response.result;

//         let buttons :{
//             [key in opinionType]:{
//                 label:string,
//                 neglabel:string,
//                 active:boolean,
//                 _id:string
//             }
//         } = {
//             'follow': {
//                 label: 'Follow',
//                 neglabel: 'Un-Follow',
//                 active: true,
//                 _id: ''
//             },
//             'upvote': {
//                 label: 'Up Vote',
//                 neglabel: 'Un-Up Vote',
//                 active: true,
//                 _id: ''
//             },
//             'downvote': {
//                 label: 'Down Vote',
//                 neglabel: 'Un-Down Vote',
//                 active: true,
//                 _id: ''
//             },
//             'spamreport': {
//                 label: 'Spam Report',
//                 neglabel: 'Un-Spam Report',
//                 active: true,
//                 _id: ''
//             }
//         };

//         if (this.props.commentId) {
//             if (this.props.postAuthorView) {
//                 buttons['follow']['label'] = "Mark as Resolved";
//                 buttons['follow']['neglabel'] = "Un-Mark as Resolved";
//             } else {
//                 delete buttons['follow'];
//             }
//         }

//         console.log('opinions', opinions);

//         opinions.forEach((_opinion: any) => {
//             console.log(_opinion);
//             buttons[_opinion.data.opinionType].active = false;
//             buttons[_opinion.data.opinionType]._id = _opinion.data._id;
//         })


//         for( const buttonType of Object.keys(buttons) ){
//             const onClick = ()=>{
//                 if(buttons[buttonType].active)
//                     createOpinion(buttonType);
//                 else
//                     deleteOpinion(buttons[buttonType]._id);
//             };
//             const label = buttons[buttonType].active?buttons[buttonType].label:buttons[buttonType].neglabel;
//             result[buttonType] = {label,onClick,positive:buttons[buttonType].active};
//         }
//     } catch (error) {
//         console.error('common.utils',error);
//     }
//     return result;
// }