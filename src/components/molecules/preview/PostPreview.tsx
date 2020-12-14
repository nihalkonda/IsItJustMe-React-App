import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { ITag, Post } from '../../../rest/data/posts'
import UserProfilePreview from '../preview/UserProfilePreview'
import MyValueComponent from '../../atoms/MyValueComponent';
import MyAddressText from '../../atoms/MyAddressText';
import * as CommonUtils from '../../../utils/common.utils';
import * as NkReactLibrary from 'nk-react-library';
import { Utils } from 'nk-js-library';
import MyChip from '../../atoms/tag/MyTag';
import NkCard from '../../atoms/NkCard';

export default class PostPreview extends Component<{
    post: Post
}> {

    render() {

        return (
            <div>
                <NkCard isLink to={'/post/' + this.props.post.data._id} style={{
                    minWidth: '50vw'
                }}>
                    <Card.Body>
                        <Row>
                            <Col xs='auto'>
                                <MyValueComponent values={[{
                                    singular: 'score',
                                    plural: 'score',
                                    value: this.props.post.data.stats.score,
                                    variant: 0
                                }]} />
                                <br />
                                <MyValueComponent values={[
                                    {
                                        singular: 'answer',
                                        value: this.props.post.data.stats.resolveCount,
                                        variant: 1
                                    },
                                    {
                                        singular: 'update',
                                        value: this.props.post.data.stats.updateCount,
                                        variant: 0.5
                                    },
                                    {
                                        singular: 'comment',
                                        value: this.props.post.data.stats.commentCount,
                                        variant: 0
                                    },
                                    {
                                        singular: 'view',
                                        value: this.props.post.data.stats.viewCount,
                                        variant: 0
                                    }
                                ]} />
                            </Col>
                            <Col>
                                <Card.Title>{this.props.post.data.content.title}</Card.Title>
                                <Card.Text>
                                    <div>
                                        {
                                            (this.props.post.data.content.tags as ITag[]).map((tag: ITag) => <MyChip tag={tag} />)
                                        }
                                    </div>
                                    {/* <StatsPreview type='post' {...this.props.post.data.stats}/> */}
                                    <p>Location: <MyAddressText location={this.props.post.data.location} /></p>
                                    <p>Created: {Utils.CommonUtils.timeContextualize(new Date(this.props.post.data.createdAt))}</p>
                                    <UserProfilePreview {...this.props.post.data.author} small={true} />
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </NkCard>
                <br />
            </div>
        )
    }
}
