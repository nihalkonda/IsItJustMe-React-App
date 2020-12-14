import React, { Component } from 'react';
import * as Publisher from '../../utils/pubsub/publisher';
import { Post } from '../../rest/data/posts';
import { REST } from 'nk-rest-js-library';
import * as NkReactLibrary from 'nk-react-library';

export default class DeletePost extends Component<{
    postId: string
}>  {

    // modal:MyModal;

    post: Post;

    componentDidMount() {
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.postId;
        REST.SafePromise(this.post.read()).then((result) => {
            console.log('Post', 'Read', 'result', result);
            if (this.post.data.author.userId === REST.Headers.getUserId()) {
                //this.modal.openModal();
                NkReactLibrary.Utils.NkReactUtils.Modal.confirm({
                    title: 'Delete Post',
                    description: 'Do you want to delete the post?',
                    negativeLabel: 'Cancel',
                    positiveLabel: 'Delete',
                    positiveWarning: true
                }).then((bool: boolean) => {
                    if (bool) {
                        REST.SafePromise(this.post.delete()).then((result) => {
                            console.log('Post', 'Delete', 'result', result);
                            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Deleted', '');
                            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post');
                        }).catch((err) => {
                            console.log('Post', 'Delete', 'err', err);
                            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Deletion Failed', '');
                            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.post.data._id);
                        })
                    }
                });
            } else {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.post.data._id);
            }
        }).catch((err) => {
            console.log('Post', 'Read', 'err', err);
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.post.data._id);
        })
    }

    render() {
        return (
            <div>
                {/* <MyModal ref={(el)=>{this.modal = el;}} type='confirm' modalProps={{
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
                }}/> */}
            </div>
        )
    }
}

