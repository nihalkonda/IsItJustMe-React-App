import React, { Component } from 'react';
import MyModal from '../../components/molecules/modal/MyModal';
import Headers from '../../rest/rest/headers';
import safePromise from '../../rest/rest/safe.promise';
import * as Publisher from '../../utils/pubsub/publisher';
import * as Invoker from '../../utils/factory/invoker';
import { Post } from '../../rest/data/posts';
import headers from '../../rest/rest/headers';

export default class DeletePost extends Component<{
    [key:string]:any
}>  {

    modal:MyModal;

    post:Post;

    componentDidMount(){
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.match.params.postId;
        safePromise(this.post.read()).then((result)=>{
            console.log('Post','Read','result',result);
            if(this.post.data.author.userId === headers.getUserId()){
                this.modal.openModal();
            }else{
                Invoker.redirectToURL('/post/'+this.post.data._id);
            }
        }).catch((err)=>{
            console.log('Post','Read','err',err);
            Invoker.redirectToURL('/post/'+this.post.data._id);
        }) 
    }

    render() {
        return (
            <div>
                <MyModal ref={(el)=>{this.modal=el;}} type='confirm' modalProps={{
                    title:'Delete Post',
                    description:'Do you want to delete the post?',
                    negativeLabel:'Cancel',
                    positiveLabel:'Delete',
                    responseHandler:(bool:boolean)=>{
                        if(bool){
                            safePromise(this.post.delete()).then((result)=>{
                                console.log('Post','Delete','result',result);
                                Invoker.createToast('Post Deleted','');
                                Invoker.redirectToURL('/post');
                            }).catch((err)=>{
                                console.log('Post','Delete','err',err);
                                Invoker.createToast('Post Deletion Failed','');
                                Invoker.redirectToURL('/post/'+this.post.data._id);
                            }) 
                        }
                    }
                }}>
                </MyModal>
            </div>
        )
    }
}

