import React, { Component } from 'react'
import MyChip from '../atoms/MyChip'
export default class MyTags extends Component<{
    tags:string[]
}> {
    render() {
        return (
            <div>
                {
                    this.props.tags.map((tag:string)=><MyChip text={tag}/>)
                }
            </div>
        )
    }
}
