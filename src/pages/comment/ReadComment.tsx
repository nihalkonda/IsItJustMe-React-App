import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import CommentView from '../../components/molecules/fullview/CommentView';
import { Post,Comment } from '../../rest/data/posts';
import Headers from '../../rest/rest/headers';
import { Publisher } from '../../utils/pubsub';
import CreateOpinion from '../opinion/CreateOpinion';
import { PubSub, Subscriber, Topic } from '../../utils/pubsub';
import safePromise from '../../rest/rest/safe.promise';
import * as Invoker from '../../utils/factory/invoker';

export default class ReadComment extends Component<{
    [key:string]:any
}> implements Subscriber{
    state = {
        loaded:0
    };

    // comment:Comment;

    // loadComment(){
    //     this.comment = new Comment();
    //     console.log(this.props);
    //     this.comment.data._id = this.props.match.params.commentId;
    //     this.comment.data.postId = this.props.match.params.postId;

    //     safePromise(this.comment.read()).then((result)=>{
    //         console.log('Comment','Read','result',result);
    //         this.setState({loaded:new Date().getTime()});
    //     }).catch((err)=>{
    //         console.log('Comment','Read','err',err);
    //     }) 
    // }

    post:Post;
    comment:Comment;

    loadComment(){
        this.post = new Post();
        this.post.data._id = this.props.match.params.postId;

        safePromise(this.post.read()).then((result)=>{
            console.log('Comment','Post','Read','result',result);
            this.comment = new Comment();
            this.comment.data._id = this.props.match.params.commentId;
            this.comment.data.postId = this.props.match.params.postId;
            safePromise(this.comment.read()).then((result)=>{
                console.log('Comment','Read','result',result);
                this.setState({loaded:new Date().getTime()});
            }).catch((err)=>{
                console.log('Comment','Read','err',err);
            })  
        }).catch((err)=>{
            console.log('Comment','Post','Read','err',err);
        }) 
    }

    processMessage(topic:string,message:any){
        if(topic === Topic.OPINION.CREATED){
            this.loadComment();
        }
    }

    componentDidMount(){
        this.loadComment();
        PubSub.subscribe(Topic.OPINION.CREATED,this);
    }

    render() {
        if(!this.state.loaded){
            return <div></div>
        }
        const isPostAuthor = this.post.data.author.userId === Headers.getUserId();
        const isCommentAuthor = this.comment.data.author.userId === Headers.getUserId();
        return (
            <div>
                <br/>
                <Button onClick={()=>{
                    Invoker.redirectToURL('/post/'+this.comment.data.postId);
                }}>&lt; Back to Post</Button>
                <br/>
                <br/>
                <CommentView comment={this.comment} authorView={isCommentAuthor}/>
                <CreateOpinion postId={this.comment.data.postId} commentId={this.comment.data._id} postAuthorView={isPostAuthor}/>
            </div>
        )
    }
}
