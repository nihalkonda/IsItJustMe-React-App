import React, { Component } from 'react'
import { ITag } from '../../rest/data/posts'
import MyChip from '../atoms/MyChip'
export default class MyTags extends Component<{
    tags:ITag[]
}> {
    render() {
        return (
            <div>
                {
                    this.props.tags.map((tag)=><MyChip tag={tag} />)
                }
            </div>
        )
    }
}
