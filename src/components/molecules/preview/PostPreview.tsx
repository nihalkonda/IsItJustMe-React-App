import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap'
import { ITag, Post } from '../../../rest/data/posts'
import { Publisher } from '../../../utils/pubsub'
import StatsPreview from '../preview/StatsPreview'
import UserProfilePreview from '../preview/UserProfilePreview'
import MyTags from '../MyTags';
import MyValueComponent from '../../atoms/MyValueComponent';
import MyCard from '../../atoms/MyCard';
import MyAddressText from '../../atoms/MyAddressText';

export default class PostPreview extends Component<{
    post:Post
}> {

    render() {

        return (
            <div>
                <MyCard isLink to={'/post/'+this.props.post.data._id} style={{
                    minWidth:700
                }}>
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
                                    <MyTags tags={this.props.post.data.content.tags as ITag[]}/>
                                    <StatsPreview type='post' {...this.props.post.data.stats}/>
                                    <p>Location: <MyAddressText location={this.props.post.data.location}/></p>
                                    <UserProfilePreview {...this.props.post.data.author} small={true}/>
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </MyCard>
                <br/>
            </div>
        )
    }
}
