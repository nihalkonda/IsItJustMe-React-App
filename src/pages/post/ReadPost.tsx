import React, { Component } from 'react';
import {Comment, Post} from '../../rest/data/posts';
import PostView from '../../components/molecules/fullview/PostView';
import headers from '../../rest/rest/headers';
import SearchResults from '../../components/templates/SearchResults';
import { Button, Col, Row } from 'react-bootstrap';
import CreateComment from '../comment/CreateComment';
import { PubSub, Subscriber, Topic } from '../../utils/pubsub';
//import CreateOpinion from '../opinion/CreateOpinion';
import safePromise from '../../rest/rest/safe.promise';
import CreateOpinion from '../opinion/CreateOpinion';

export default class ReadPost extends Component<{
    [key:string]:any
}> implements Subscriber{
    state = {
        loaded:0,
        opinionButtons:{}
    };

    post:Post;

    loadPost(){
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.match.params.postId;
        safePromise(this.post.read(true)).then((result)=>{
            console.log('Post','Read','result',result);
            this.setState({loaded:new Date().getTime()});
            
        }).catch((err)=>{
            console.log('Post','Read','err',err);
        }) 
    }

    processMessage(topic:string,message:any){
        if(topic === Topic.COMMENT.CREATED || topic === Topic.OPINION.CREATED){
            this.loadPost();
        }
    }

    componentDidMount(){
        this.loadPost();
        PubSub.subscribe(Topic.COMMENT.CREATED,this);
        PubSub.subscribe(Topic.OPINION.CREATED,this);
    }

    render() {
        if(!this.state.loaded){
            return <div></div>
        }
        console.log(this.state,this.post);
        const isPostAuthor = this.post.data.author.userId===headers.getUserId();
        console.log('ReadPost',this.post.data.author.userId,headers.getUserId(),isPostAuthor);
        const comment = new Comment();
        comment.data.postId = this.post.data._id;
        return (
            <div>
                <PostView post={this.post} authorView={isPostAuthor} />
                <CreateOpinion postId={this.post.data._id} postAuthorView={isPostAuthor}/>
                <CreateComment postId={this.post.data._id} postAuthorView={isPostAuthor}/>
                <h3>Comments</h3>
                <SearchResults itemType='comment' item={comment} loaded={this.state.loaded} quickFilters={[
                    {
                        label:'Latest',
                        filter:{
                            query:{
                                'isDeleted':false
                            },
                            sort:{
                                'lastModifiedAt':-1
                            }
                        }
                    },
                    {
                        label:'Updates',
                        filter:{
                            query:{
                                'isDeleted':false,
                                'context':'update'
                            },
                            sort:{
                                'lastModifiedAt':-1
                            }
                        }
                    },
                    {
                        label:'Answers',
                        filter:{
                            query:{
                                'isDeleted':false,
                                'context':'resolve'
                            },
                            sort:{
                                'lastModifiedAt':-1
                            }
                        }
                    }
                ]}/>
            </div>
        )
    }
}
