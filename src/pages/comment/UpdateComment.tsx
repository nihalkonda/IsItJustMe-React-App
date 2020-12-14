import React, { Component } from 'react'
import { Post, Comment } from '../../rest/data/posts';
import { Button } from 'react-bootstrap';
import { REST } from 'nk-rest-js-library';
import * as NkReactLibrary from 'nk-react-library';

export default class UpdateComment extends Component<{
    postId: string,
    commentId: string
}> {
    state = {
        loaded: 0
    };

    post: Post;
    comment: Comment;

    componentDidMount() {
        this.post = new Post();
        this.post.data._id = this.props.postId;

        REST.SafePromise(this.post.read()).then((result) => {
            console.log('Comment', 'Post', 'Read', 'result', result);
            this.comment = new Comment();
            this.comment.data._id = this.props.commentId;
            this.comment.data.postId = this.props.postId;
            REST.SafePromise(this.comment.read()).then((result) => {
                console.log('Comment', 'Read', 'result', result);
                this.setState({ loaded: new Date().getTime() });
            }).catch((err) => {
                console.log('Comment', 'Read', 'err', err);
            })
        }).catch((err) => {
            console.log('Comment', 'Post', 'Read', 'err', err);
        })
    }
    render() {
        if (!this.state.loaded) {
            return <div></div>
        }

        if (this.comment.data.author.userId !== REST.Headers.getUserId()) {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Update Failed', '');
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
            return <div></div>
        }
        const formConfig: NkReactLibrary.Components.NkFormElements.NkFormElementTypes.config[] = [
            {
                id: 'content',
                type: 'rich-text',
                label: 'Content',
                defaultValue: this.comment.data.content
            },
            {
                id: 'context',
                type: 'submit',
                label: 'General',
                defaultValue: 'general',
                inline: true
            },
            {
                id: 'context',
                type: 'submit',
                label: 'Update',
                defaultValue: 'update',
                inline: true
            }
        ];

        if (this.post.data.author.userId === REST.Headers.getUserId()) {
            formConfig.push({
                id: 'context',
                type: 'submit',
                label: 'Resolve',
                defaultValue: 'resolve',
                inline: true
            });
        }

        return (

            <div>
                <br />
                <Button onClick={() => {
                    NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
                }}>&lt; Back to Comment</Button>
                <br />
                <br />
                <NkReactLibrary.Components.NkForm title="Update Comment" description="Update your comment." formConfig={formConfig} formSubmit={(result) => {
                    console.log('submitted', result);

                    this.comment.data.content = result.content;
                    this.comment.data.context = result.context;

                    REST.SafePromise(this.comment.update()).then((result) => {
                        console.log('UpdateComment', 'formSubmit', 'update', 'result', result);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Updated', 'Comment has been updated.');
                        NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
                    }).catch((error) => {
                        console.log('UpdateComment', 'formSubmit', 'update', 'error', error);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Updation Failed', 'Comment updation has failed.');
                    })

                }} />
            </div>
        )
    }
}
