import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { Post } from '../../../rest/data/posts'
import * as Invoker from '../../../utils/factory/invoker'
import MyRichTextContainer from '../../atoms/MyRichTextContainer'
import MyTags from '../MyTags'
import StatsPreview from '../preview/StatsPreview'
import UserProfilePreview from '../preview/UserProfilePreview'


export default class PostView extends Component<{
    post:Post,
    authorView:boolean
}> {

    render() {

        let location = '';

        try {
            location = `${this.props.post.data.location.raw.city}, ${this.props.post.data.location.raw.region}, ${this.props.post.data.location.raw.country}`;
        } catch (error) {
            
        }

        return (
            <div>
                <br/>
                <h4>{this.props.post.data.content.title}</h4>
                <hr/>
                <MyRichTextContainer html={this.props.post.data.content.body}/>
                <MyTags tags={this.props.post.data.content.tags}/>
                <StatsPreview type='post' {...this.props.post.data.stats}/>
                <p>Location: {location}</p>
                <UserProfilePreview {...this.props.post.data.author}/>
                {
                    this.props.authorView?
                    <div>
                        <br/>
                        <Button as={Link} to={`/post/${this.props.post.data._id}/update`} >Update Post</Button>{' '}
                        <Button as={Link} to={`/post/${this.props.post.data._id}/delete`} >Delete Post</Button>
                        <br/>
                    </div>:
                    <div></div>
                }
                
            </div>
        )
    }
}
