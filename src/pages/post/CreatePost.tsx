import { REST } from 'nk-rest-js-library';
import React from 'react'
import { Post } from '../../rest/data/posts';
import * as RestUtils from '../../rest/RestUtils';
import * as CommonUtils from '../../utils/common.utils';
import * as NkReactLibrary from 'nk-react-library';
import TagInput from '../../components/atoms/tag/MyTagInput';

export default function CreatePost() {
    return (
        <NkReactLibrary.Components.NkForm title="Create Post" description="Create a post." formConfig={[
            {
                id: 'title',
                type: 'input',
                label: 'Title',
                required: true
            },
            {
                id: 'body',
                type: 'rich-text',
                label: 'Body'
            },
            {
                id: 'tags',
                type: 'custom',
                label: 'Test Label',
                liveSuggestions: (value, callback) => {
                    RestUtils.liveTagSuggestions(value, callback);
                },
                customComponent: TagInput
            },
            {
                id: 'submit',
                type: 'submit',
                label: 'Create Post'
            }
        ]} formSubmit={(result) => {
            console.log('submitted', result);

            const post = new Post();

            post.data.content.title = result.title;
            post.data.content.body = result.body;
            post.data.content.tags = result.tags;

            const { latitude, longitude } = CommonUtils.getLocation();

            post.data.location.latitude = latitude;
            post.data.location.longitude = longitude;

            REST.SafePromise(post.create()).then((result) => {
                console.log('CreatePost', 'formSubmit', 'create', 'result', result);
                NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Created', 'Post has been created.');
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/post/' + post.data._id);
            }).catch((error) => {
                console.log('CreatePost', 'formSubmit', 'create', 'error', error);
                NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Post Creation Failed', 'Post creation has failed.');
            })

        }} />
    )
}
