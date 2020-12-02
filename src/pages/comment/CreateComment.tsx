import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import {config} from '../../components/atoms/form/Types';
import { Publisher } from '../../utils/pubsub';
import * as Invoker from '../../utils/factory/invoker';
import { Comment } from '../../rest/data/posts';
import safePromise from '../../rest/rest/safe.promise';
import * as CommonUtils from '../../utils/common.utils';

export default class CreateComment extends Component<{
    postId:string,
    postAuthorView:boolean
}> {
    render() {
        const formConfig:config[] = [
            {
                id:'content',
                type:'rich-text',
                label:'Content'
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

        if(this.props.postAuthorView){
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
                <MyForm title="Create Comment" description="Create a comment." formConfig={formConfig} formSubmit={(result)=>{
                    console.log('submitted',result);

                    const comment = new Comment();

                    comment.data.content = result.content||'';

                    if(CommonUtils.stripHtml(comment.data.content).trim().length===0){
                        Invoker.createToast('Comment Creation Failed','Cannot create a empty comment.');
                        return;
                    }

                    comment.data.context = result.context;
                    comment.data.postId = this.props.postId;

                    const {latitude,longitude} = CommonUtils.getLocation();

                    comment.data.location.latitude = latitude;
                    comment.data.location.longitude = longitude;

                    safePromise(comment.create()).then((result)=>{
                        console.log('CreateComment','formSubmit','create','result',result);
                        Invoker.createToast('Comment Created','Comment has been created.');
                        Publisher.commentCreated();
                    }).catch((error)=>{
                        console.log('CreateComment','formSubmit','create','error',error);
                        Invoker.createToast('Comment Creation Failed','Comment creation has failed.');
                    })

                }}/>
            </div>
        )
    }
}
