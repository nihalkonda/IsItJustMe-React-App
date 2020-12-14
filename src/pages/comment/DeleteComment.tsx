import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react';
import { Comment } from '../../rest/data/posts';
import * as NkReactLibrary from 'nk-react-library';

export default class DeleteComment extends Component<{
    postId: string,
    commentId: string
}>  {

    comment: Comment;

    componentDidMount() {
        this.comment = new Comment();
        this.comment.data._id = this.props.commentId;
        this.comment.data.postId = this.props.postId;
        REST.SafePromise(this.comment.read()).then((result) => {
            console.log('Comment', 'Read', 'result', result);
            if (this.comment.data.author.userId === REST.Headers.getUserId()) {
                //this.modal.openModal();
                NkReactLibrary.Utils.NkReactUtils.Modal.confirm({
                    title: 'Delete Comment',
                    description: 'Do you want to delete the comment?',
                    negativeLabel: 'Cancel',
                    positiveLabel: 'Delete',
                    positiveWarning: true
                }).then((bool: boolean) => {
                    if (bool) {
                        REST.SafePromise(this.comment.delete()).then((result) => {
                            console.log('Comment', 'Delete', 'result', result);
                            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Deleted', '');
                            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId);
                        }).catch((err) => {
                            console.log('Comment', 'Delete', 'err', err);
                            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Deletion Failed', '');
                            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
                        })
                    }
                })
            } else {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
            }
        }).catch((err) => {
            console.log('Comment', 'Read', 'err', err);
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
        })
    }

    render() {
        return (
            <div>
                {/* <MyModal ref={(el) => { this.modal = el; }} type='confirm' modalProps={{
                    title: 'Delete Comment',
                    description: 'Do you want to delete the comment?',
                    negativeLabel: 'Cancel',
                    positiveLabel: 'Delete',
                    responseHandler: (bool: boolean) => {
                        if (bool) {
                            safePromise(this.comment.delete()).then((result) => {
                                console.log('Comment', 'Delete', 'result', result);
                                Invoker.createToast('Comment Deleted', '');
                                Invoker.redirectToURL('/post/' + this.comment.data.postId);
                            }).catch((err) => {
                                console.log('Comment', 'Delete', 'err', err);
                                Invoker.createToast('Comment Deletion Failed', '');
                                Invoker.redirectToURL('/post/' + this.comment.data.postId + '/comment/' + this.comment.data._id);
                            })
                        }
                    }
                }}>
                </MyModal> */}
            </div>
        )
    }
}

