import React, { Component } from 'react'
import MyIcon from '../../atoms/MyIcon';

export default class StatsPreview extends Component<{
    type:string,
    [key:string]:any
}> {
    render() {
        let props = JSON.parse(JSON.stringify(this.props));
        
        let stats = {};

        stats['comment'] = ['upvoteCount','downvoteCount','spamreportCount'];
        stats['post'] = ['followCount',...stats['comment'],'viewCount','commentCount','updateCount','resolveCount'];

        return (
            <div>
                {
                    stats[this.props.type].map(stat=><p style={{border:'1px solid',padding:3,margin:3,display:'inline-block'}}><MyIcon type={stat} /> {props[stat]}</p>)
                }
            </div>
        )
    }
}
