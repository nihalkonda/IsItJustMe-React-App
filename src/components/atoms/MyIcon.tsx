import React, { Component } from 'react'

import { FaArrowUp,FaArrowDown,FaEye,FaPortrait,FaExclamationCircle,FaRegComment,FaRegCommentDots,FaRegCommentAlt } from 'react-icons/fa';
import {GrScorecard} from 'react-icons/gr'; 
import {RiCloseCircleFill} from 'react-icons/ri'; 


export default class MyIcon extends Component<{
    type:string,
    active?:boolean,
    [key:string]:any
}> {
    render() {
        const props:any = {};

        if(this.props.active)
            props.color="#007bff";

        switch (this.props.type) {
            case 'upvoteCount':
                return <FaArrowUp {...props}/>;
            case 'downvoteCount':
                return <FaArrowDown {...props}/>;
            case 'viewCount':
                return <FaEye {...props}/>;
            case 'followCount':
                return <FaPortrait {...props}/>;
            case 'spamreportCount':
                return <FaExclamationCircle {...props}/>;
            case 'commentCount':
                return <FaRegComment {...props}/>;
            case 'updateCount':
                return <FaRegCommentDots {...props}/>;
            case 'resolveCount':
                return <FaRegCommentAlt {...props}/>;
            case 'score':
                return <GrScorecard {...props}/>;
            case 'close':
                return <RiCloseCircleFill {...props}/>;
            default:
                return <FaArrowUp {...props}/>;
        }
    }
}
