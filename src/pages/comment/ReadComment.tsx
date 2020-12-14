import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import CommentView from '../../components/molecules/fullview/CommentView';
import { Post, Comment } from '../../rest/data/posts';
import CreateOpinion from '../opinion/CreateOpinion';
import Topic from '../../utils/pubsub/topic';
import * as Publisher from '../../utils/pubsub/publisher';
import { Services } from 'nk-js-library';
import { REST } from 'nk-rest-js-library';
import * as NkReactLibrary from 'nk-react-library';

export default class ReadComment extends Component<{
    postId: string,
    commentId: string
}> implements Services.PubSubService.Subscriber {
    state = {
        loaded: 0
    };

    post: Post;
    comment: Comment;

    loadComment() {
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

    processMessage(message: Services.PubSubService.Message) {
        if (message.type === Topic.OPINION.CREATED) {
            this.loadComment();
        }
    }

    componentDidMount() {
        this.loadComment();
        Services.PubSubService.Organizer.addSubscriber(Topic.OPINION.CREATED, this);
    }

    render() {
        if (!this.state.loaded) {
            return <div></div>
        }
        const isPostAuthor = this.post.data.author.userId === REST.Headers.getUserId();
        const isCommentAuthor = this.comment.data.author.userId === REST.Headers.getUserId();
        return (
            <div>
                <br />
                <Button onClick={() => {
                    NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.comment.data.postId);
                }}>&lt; Back to Post</Button>
                <br />
                <br />
                <CommentView comment={this.comment} authorView={isCommentAuthor} />
                <CreateOpinion postId={this.comment.data.postId} commentId={this.comment.data._id} postAuthorView={isPostAuthor} />
            </div>
        )
    }
}
