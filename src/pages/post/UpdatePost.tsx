import { REST } from 'nk-rest-js-library';
import React, { Component } from 'react'
import { Post } from '../../rest/data/posts';
import * as RestUtils from '../../rest/RestUtils';
import * as NkReactLibrary from 'nk-react-library';
import TagInput from '../../components/atoms/tag/MyTagInput';

export default class UpdatePost extends Component<{
    postId: string
}> {

    state = {
        loaded: 0
    };

    post: Post;

    componentDidMount() {
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.postId;
        REST.SafePromise(this.post.read()).then((result) => {
            console.log('Post', 'Read', 'result', result);
            this.setState({ loaded: new Date().getTime() });
        }).catch((err) => {
            console.log('Post', 'Read', 'err', err);
        })
    }
    render() {
        if (!this.state.loaded) {
            return <div></div>
        }

        if (this.post.data.author.userId !== REST.Headers.getUserId()) {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Update Failed', '');
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.post.data._id);
            return <div></div>
        }

        return (
            <div>
                <NkReactLibrary.Components.NkForm title="Update Post" description="Update your post." formConfig={[
                    {
                        id: 'title',
                        type: 'input',
                        label: 'Title',
                        defaultValue: this.post.data.content.title,
                        required: true
                    },
                    {
                        id: 'body',
                        type: 'rich-text',
                        label: 'Body',
                        defaultValue: this.post.data.content.body
                    },
                    {
                        id: 'tags',
                        type: 'custom',
                        defaultValue: (this.post.data.content.tags as any[]).map((t) => {
                            if (t.constructor === ''.constructor) {
                                return t;
                            } else {
                                return t.tag;
                            }
                        }),
                        liveSuggestions: (value, callback) => {
                            RestUtils.liveTagSuggestions(value, callback);
                        },
                        customComponent: TagInput
                    },
                    {
                        id: 'submit',
                        type: 'submit',
                        label: 'Update Post'
                    }
                ]} formSubmit={(result) => {
                    console.log('submitted', result);

                    this.post.data.content.title = result.title;
                    this.post.data.content.body = result.body;
                    this.post.data.content.tags = result.tags;

                    REST.SafePromise(this.post.update()).then((result) => {
                        console.log('UodatePost', 'formSubmit', 'update', 'result', result);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Updated', 'Post has been updated.');
                        NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + this.post.data._id);
                    }).catch((error) => {
                        console.log('CreatePost', 'formSubmit', 'update', 'error', error);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Updation Failed', 'Post updation has failed.');
                    })

                }} />
            </div>
        )
    }
}
