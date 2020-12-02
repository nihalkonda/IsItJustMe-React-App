import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Post } from '../../../rest/data/posts'
import { Publisher } from '../../../utils/pubsub'
import StatsPreview from '../preview/StatsPreview'
import UserProfilePreview from '../preview/UserProfilePreview'
import MyTags from '../MyTags';
import MyValueComponent from '../../atoms/MyValueComponent';

export default class PostPreview extends Component<{
    post:Post
}> {

    render() {

        let location = '';

        try {
            location = `${this.props.post.data.location.raw.city}, ${this.props.post.data.location.raw.region}, ${this.props.post.data.location.raw.country}`;
        } catch (error) {
            
        }

        return (
            <div>
                <Card style={{color:'initial',textDecoration:'initial'}} as={Link} onClick={(event)=>{
                    event.stopPropagation();
                    // Publisher.redirectToURL('/post/'+this.props.post.data._id);
                }} to={'/post/'+this.props.post.data._id}>
                    <Card.Body>
                        <Row>
                            <Col xs='auto'>
                                <MyValueComponent values={[{
                                    singular:'score',
                                    plural:'score',
                                    value:this.props.post.data.stats.score,
                                    variant:0
                                }]}/>
                                <br/>
                                <MyValueComponent values={[
                                        {
                                            singular : 'answer',
                                            value : this.props.post.data.stats.resolveCount,
                                            variant : 1
                                        },
                                        {
                                            singular : 'update',
                                            value : this.props.post.data.stats.updateCount,
                                            variant : 0.5
                                        },
                                        {
                                            singular : 'comment',
                                            value : this.props.post.data.stats.commentCount,
                                            variant : 0
                                        },
                                        {
                                            singular : 'view',
                                            value : this.props.post.data.stats.viewCount,
                                            variant : 0
                                        }
                                    ]}/>
                            </Col>
                            <Col>
                                <Card.Title>{this.props.post.data.content.title}</Card.Title>
                                <Card.Text>
                                    <MyTags tags={this.props.post.data.content.tags}/>
                                    <StatsPreview type='post' {...this.props.post.data.stats}/>
                                    <p>Location: {location}</p>
                                    <UserProfilePreview {...this.props.post.data.author} small={true}/>
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br/>
            </div>
        )
    }
}
