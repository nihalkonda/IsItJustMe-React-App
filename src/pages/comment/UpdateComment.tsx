import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import {config} from '../../components/atoms/form/Types';
import { Post,Comment } from '../../rest/data/posts';
import safePromise from '../../rest/rest/safe.promise';
import headers from '../../rest/rest/headers';
import { Button } from 'react-bootstrap';
import * as Invoker from '../../utils/factory/invoker';

export default class UpdateComment extends Component<{
    [key:string]:any
}> {
    state = {
        loaded:0
    };

    post:Post;
    comment:Comment;

    componentDidMount(){
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
    render() {
        if(!this.state.loaded){
            return <div></div>
        }

        if(this.comment.data.author.userId !== headers.getUserId()){
            Invoker.createToast('Comment Update Failed','');
            Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
            return <div></div>
        }
        const formConfig:config[] = [
            {
                id:'content',
                type:'rich-text',
                label:'Content',
                defaultValue:this.comment.data.content
            },
            {
                id:'context',
                type:'submit',
                label:'General',
                defaultValue:'general',
                inline:true
            },
            {
                id:'context',
                type:'submit',
                label:'Update',
                defaultValue:'update',
                inline:true
            }
        ];

        if(this.post.data.author.userId === headers.getUserId()){
            formConfig.push({
                id:'context',
                type:'submit',
                label:'Resolve',
                defaultValue:'resolve',
                inline:true
            });
        }

        return (

            <div>
                <br/>
                <Button onClick={()=>{
                    Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
                }}>&lt; Back to Comment</Button>
                <br/>
                <br/>
                <MyForm title="Update Comment" description="Update your comment." formConfig={formConfig} formSubmit={(result)=>{
                    console.log('submitted',result);

                    this.comment.data.content = result.content;
                    this.comment.data.context = result.context;

                    safePromise(this.comment.update()).then((result)=>{
                        console.log('UpdateComment','formSubmit','update','result',result);
                        Invoker.createToast('Comment Updated','Comment has been updated.');
                        Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
                    }).catch((error)=>{
                        console.log('UpdateComment','formSubmit','update','error',error);
                        Invoker.createToast('Comment Updation Failed','Comment updation has failed.');
                    })

                }}/>
            </div>
        )
    }
}
