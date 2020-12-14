import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { ITag, Post, Tag } from '../../../rest/data/posts'
import * as NkReactLibrary from 'nk-react-library';
import StatsPreview from '../preview/StatsPreview'
import UserProfilePreview from '../preview/UserProfilePreview'
import MyAddressText from '../../atoms/MyAddressText';
import MyChip from '../../atoms/tag/MyTag';


export default function PostView({ post, authorView }: {
    post: Post,
    authorView: boolean
}) {

    return (
        <div>
            <br />

            <h4>{post.data.content.title}</h4>
            <hr />
            <NkReactLibrary.Components.Commons.NkRichTextContainer html={post.data.content.body} />
            <div>
                {
                    (post.data.content.tags as ITag[]).map((tag: ITag) => <MyChip tag={tag} />)
                }
            </div>
            <StatsPreview type='post' {...post.data.stats} />
            <p>Location: <MyAddressText location={post.data.location} /></p>
            <UserProfilePreview {...post.data.author} />
            {
                authorView ?
                    <div>
                        <br />
                        <Button as={Link} to={`/post/${post.data._id}/update`} >Update Post</Button>{' '}
                        <Button as={Link} to={`/post/${post.data._id}/delete`} >Delete Post</Button>
                        <br />
                    </div> :
                    <div></div>
            }

        </div>
    )
}
