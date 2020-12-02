import React, { Component } from 'react'
import { Post, Comment, Tag } from '../../rest/data/posts';
import ItemPreview from '../molecules/preview/ItemPreview';

export default class ItemList extends Component<{
    itemType:string,
    items:Post[]|Comment[]|Tag[]
}> {
    render() {
        let itemStubs = [];

        this.props.items.forEach((item:Post|Comment|Tag)=>{itemStubs.push(<ItemPreview itemType={this.props.itemType} item={item}/>);});

        return (
            <div>
                {
                    itemStubs
                }
            </div>
        )
    }
}
