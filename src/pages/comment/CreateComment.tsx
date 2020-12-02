import React, { Component } from 'react'
import MyForm from '../../components/molecules/MyForm';
import {config} from '../../components/atoms/form/Types';
import { Publisher } from '../../utils/pubsub';
import * as Invoker from '../../utils/factory/invoker';
import { Comment } from '../../rest/data/posts';
import safePromise from '../../rest/rest/safe.promise';

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

                    comment.data.content = result.content;
                    comment.data.context = result.context;
                    comment.data.postId = this.props.postId;

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
