import React, { Component } from 'react'
import { config } from '../../components/atoms/form/Types';
import MyForm from '../../components/molecules/MyForm';
import { Post } from '../../rest/data/posts';
import headers from '../../rest/rest/headers';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';
import * as RestUtils from '../../rest/RestUtils';

export default class UpdatePost extends Component<{
    [key:string]:any
}> {

    state = {
        loaded:0
    };

    post:Post;

    componentDidMount(){
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.match.params.postId;
        safePromise(this.post.read()).then((result)=>{
            console.log('Post','Read','result',result);
            this.setState({loaded:new Date().getTime()});
        }).catch((err)=>{
            console.log('Post','Read','err',err);
        })  
    }
    render() {
        if(!this.state.loaded){
            return <div></div>
        }

        if(this.post.data.author.userId !== headers.getUserId()){
            Invoker.createToast('Post Update Failed','');
            Invoker.redirectToURL('/post/'+this.post.data._id);
            return <div></div>
        }

        return (
            <div>
                <MyForm title="Update Post" description="Update your post." formConfig={[
                    {
                        id:'title',
                        type:'input',
                        label:'Title',
                        defaultValue:this.post.data.content.title,
                        required:true
                    },
                    {
                        id:'body',
                        type:'rich-text',
                        label:'Body',
                        defaultValue:this.post.data.content.body
                    },
                    {
                        id:'tags',
                        type:'tag',
                        defaultValue:this.post.data.content.tags,
                        liveSuggestions:(value,callback)=>{
                            RestUtils.liveTagSuggestions(value,callback);
                        }
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Update Post'
                    }
                ]} formSubmit={(result)=>{
                    console.log('submitted',result);

                    this.post.data.content.title = result.title;
                    this.post.data.content.body = result.body;
                    this.post.data.content.tags = result.tags;

                    safePromise(this.post.update()).then((result)=>{
                        console.log('UodatePost','formSubmit','update','result',result);
                        Invoker.createToast('Post Updated','Post has been updated.');
                        Invoker.redirectToURL('/post/'+this.post.data._id);
                    }).catch((error)=>{
                        console.log('CreatePost','formSubmit','update','error',error);
                        Invoker.createToast('Post Updation Failed','Post updation has failed.');
                    })

                }}/>
            </div>
        )
    }
}
