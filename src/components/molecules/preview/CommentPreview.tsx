import React, { Component } from 'react'
import { Comment } from '../../../rest/data/posts';
import * as Invoker from '../../../utils/factory/invoker';
import MyRichTextContainer from '../../atoms/MyRichTextContainer';
import StatsPreview from './StatsPreview';
import UserProfilePreview from './UserProfilePreview';

export default class CommentPreview extends Component<{
    comment: Comment
}> {
    render() {
        const comment:Comment = this.props.comment;
        return (
            <div>
                <table {...{border:1}} onClick={(event)=>{
                    event.stopPropagation();
                    Invoker.redirectToURL(`/post/${comment.data.postId}/comment/${comment.data._id}`);
                }}>
                    <tr>
                        <th>
                            Content
                        </th>
                        <td>
                            <MyRichTextContainer html={comment.data.content}/>
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
                            Created At
                        </th>
                        <td>
                            {comment.data.createdAt}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Stats
                        </th>
                        <td>
                            <StatsPreview type='comment' {...comment.data.stats}/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Author
                        </th>
                        <td>
                            <UserProfilePreview {...comment.data.author} small={true}/>
                        </td>
                    </tr>
                </table>
                <br/>
            </div>
        )
    }
}