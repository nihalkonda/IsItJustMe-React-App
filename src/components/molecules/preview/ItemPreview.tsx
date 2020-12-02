import React, { Component } from 'react'
import { Post, Comment, Tag } from '../../../rest/data/posts';
import CommentPreview from './CommentPreview';
import PostPreview from './PostPreview';
import TagPreview from './TagPreview';

export default class ItemPreview extends Component<{
    itemType:string,
    item:Post|Comment|Tag
}> {
    render() {
        switch (this.props.itemType) {
            case 'post':
                return <PostPreview post={this.props.item as Post}/>
            case 'comment':
                return <CommentPreview comment={this.props.item as Comment}/>
            case 'tag':
                return <TagPreview tag={this.props.item as Tag}/>
            default:
                return <div>Blah</div>;
        }
    }
}
