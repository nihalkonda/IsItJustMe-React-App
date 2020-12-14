import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { Comment } from '../../../rest/data/posts'
// import * as Invoker from '../../../utils/factory/invoker'
// import MyRichTextContainer from '../../atoms/MyRichTextContainer'
import * as NkReactLibrary from 'nk-react-library';
import StatsPreview from '../preview/StatsPreview'
import UserProfilePreview from '../preview/UserProfilePreview'
import MyAddressText from '../../atoms/MyAddressText';



export default function CommentView({ comment, authorView }: {
    comment: Comment,
    authorView: boolean
}) {

    let extraPanel = <span></span>;

    if (authorView) {
        extraPanel = <tr>
            <td colSpan={2}>
                <Button as={Link} to={`/post/${comment.data.postId}/comment/${comment.data._id}/update`}>Update Comment</Button>
                <Button as={Link} to={`/post/${comment.data.postId}/comment/${comment.data._id}/delete`}>Delete Comment</Button>
            </td>
        </tr>
    }

    return (
        <div>
            <table {...{ border: 1 }}>
                <tr>
                    <th>
                        Content
                    </th>
                    <td>
                        <NkReactLibrary.Components.Commons.NkRichTextContainer html={comment.data.content} />
                    </td>
                </tr>
                <tr>
                    <th>
                        Context
                    </th>
                    <td>
                        {comment.data.context}
                    </td>
                </tr>
                <tr>
                    <th>
                        Location
                    </th>
                    <td>
                        <MyAddressText location={comment.data.location} />
                    </td>
                </tr>
                <tr>
                    <th>
                        Stats
                    </th>
                    <td>
                        <StatsPreview type='comment' {...comment.data.stats} />
                    </td>
                </tr>
                <tr>
                    <th>
                        Created At
                    </th>
                    <td>
                        {comment.data.createdAt}
                    </td>
                </tr>
                <tr>
                    <th>
                        Last Modified At
                    </th>
                    <td>
                        {comment.data.lastModifiedAt}
                    </td>
                </tr>
                <tr>
                    <th>
                        Created By
                    </th>
                    <td>
                        <UserProfilePreview {...comment.data.author} />
                    </td>
                </tr>
                {extraPanel}
            </table>
            <br />
        </div>
    )
}
