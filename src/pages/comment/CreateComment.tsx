import React, { Component } from 'react'
import * as Publisher from '../../utils/pubsub/publisher';
import { Comment } from '../../rest/data/posts';
import * as CommonUtils from '../../utils/common.utils';
import { Utils } from 'nk-js-library';
import * as NkReactLibrary from 'nk-react-library';
import { REST } from 'nk-rest-js-library';

export default class CreateComment extends Component<{
    postId: string,
    postAuthorView: boolean
}> {
    render() {
        const formConfig: NkReactLibrary.Components.NkFormElements.NkFormElementTypes.config[] = [
            {
                id: 'content',
                type: 'rich-text',
                label: 'Content'
            },
            {
                id: 'context',
                type: 'submit',
                label: 'General',
                defaultValue: 'general',
                inline: true
            },
            {
                id: 'context',
                type: 'submit',
                label: 'Update',
                defaultValue: 'update',
                inline: true
            }
        ];

        if (this.props.postAuthorView) {
            formConfig.push({
                id: 'context',
                type: 'submit',
                label: 'Resolve',
                defaultValue: 'resolve',
                inline: true
            });
        }

        return (

            <div>
                <NkReactLibrary.Components.NkForm title="Create Comment" description="Create a comment." formConfig={formConfig} formSubmit={(result) => {
                    console.log('submitted', result);

                    const comment = new Comment();

                    comment.data.content = result.content || '';

                    if (Utils.CommonUtils.stripHtml(comment.data.content).trim().length === 0) {
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Creation Failed', 'Cannot create a empty comment.');
                        return;
                    }

                    comment.data.context = result.context;
                    comment.data.postId = this.props.postId;

                    const { latitude, longitude } = CommonUtils.getLocation();

                    comment.data.location.latitude = latitude;
                    comment.data.location.longitude = longitude;

                    REST.SafePromise(comment.create()).then((result) => {
                        console.log('CreateComment', 'formSubmit', 'create', 'result', result);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Created', 'Comment has been created.');
                        Publisher.commentCreated();
                    }).catch((error) => {
                        console.log('CreateComment', 'formSubmit', 'create', 'error', error);
                        NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Comment Creation Failed', 'Comment creation has failed.');
                    })

                }} />
            </div>
        )
    }
}
