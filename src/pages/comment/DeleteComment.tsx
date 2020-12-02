import React, { Component } from 'react';
import MyModal from '../../components/molecules/modal/MyModal';
import safePromise from '../../rest/rest/safe.promise';
import * as Invoker from '../../utils/factory/invoker';
import { Comment } from '../../rest/data/posts';
import headers from '../../rest/rest/headers';

export default class DeleteComment extends Component<{
    [key:string]:any
}>  {

    modal:MyModal;

    comment:Comment;

    componentDidMount(){
        this.comment = new Comment();
        this.comment.data._id = this.props.match.params.commentId;
        this.comment.data.postId = this.props.match.params.postId;
        safePromise(this.comment.read()).then((result)=>{
            console.log('Comment','Read','result',result);
            if(this.comment.data.author.userId === headers.getUserId()){
                this.modal.openModal();
            }else{
                Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
            }
        }).catch((err)=>{
            console.log('Comment','Read','err',err);
            Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
        })
    }

    render() {
        return (
            <div>
                <MyModal ref={(el)=>{this.modal=el;}} type='confirm' modalProps={{
                    title:'Delete Comment',
                    description:'Do you want to delete the comment?',
                    negativeLabel:'Cancel',
                    positiveLabel:'Delete',
                    responseHandler:(bool:boolean)=>{
                        if(bool){
                            safePromise(this.comment.delete()).then((result)=>{
                                console.log('Comment','Delete','result',result);
                                Invoker.createToast('Comment Deleted','');
                                Invoker.redirectToURL('/post/'+this.comment.data.postId);
                            }).catch((err)=>{
                                console.log('Comment','Delete','err',err);
                                Invoker.createToast('Comment Deletion Failed','');
                                Invoker.redirectToURL('/post/'+this.comment.data.postId+'/comment/'+this.comment.data._id);
                            }) 
                        }
                    }
                }}>
                </MyModal>
            </div>
        )
    }
}

