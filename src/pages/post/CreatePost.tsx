import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import { ITag, Post,Tag } from '../../rest/data/posts';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';
import SearchRESTObject from '../../rest/rest/search.rest.object';
import * as RestUtils from '../../rest/RestUtils';
import * as CommonUtils from '../../utils/common.utils';

export default class CreatePost extends Component {

    render() {
        return (
            <div>
                
                <MyForm title="Create Post" description="Create a post." formConfig={[
                    {
                        id:'title',
                        type:'input',
                        label:'Title',
                        required:true
                    },
                    {
                        id:'body',
                        type:'rich-text',
                        label:'Body'
                    },
                    {
                        id:'tags',
                        type:'tag',
                        liveSuggestions:(value,callback)=>{
                            RestUtils.liveTagSuggestions(value,callback);
                        }
                    },
                    {
                        id:'submit',
                        type:'submit',
                        label:'Create Post'
                    }
                ]} formSubmit={(result)=>{
                    console.log('submitted',result);

                    const post = new Post();

                    post.data.content.title = result.title;
                    post.data.content.body = result.body;
                    post.data.content.tags = result.tags;

                    const {latitude,longitude} = CommonUtils.getLocation();

                    post.data.location.latitude = latitude;
                    post.data.location.longitude = longitude;

                    safePromise(post.create()).then((result)=>{
                        console.log('CreatePost','formSubmit','create','result',result);
                        Invoker.createToast('Post Created','Post has been created.');
                        Invoker.redirectToURL('/post/'+post.data._id);
                    }).catch((error)=>{
                        console.log('CreatePost','formSubmit','create','error',error);
                        Invoker.createToast('Post Creation Failed','Post creation has failed.');
                    })

                }}/>
            </div>
        )
    }
}
