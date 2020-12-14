import React, { Component } from 'react'
import * as Publisher from '../../utils/pubsub/publisher';
import { IOpinion, Opinion } from '../../rest/data/posts';
import { Button } from 'react-bootstrap';
import * as CommonUtils from '../../utils/common.utils';
import { REST } from 'nk-rest-js-library';
import * as NkReactLibrary from 'nk-react-library';

export default class CreateOpinion extends Component<{
    postId: string,
    commentId?: string,
    postAuthorView: boolean
}> {

    state = {
        loaded: 0
    };

    opinion: Opinion;
    searchRestObject: REST.SearchRESTObject<IOpinion>;

    loadOpinions() {
        REST.SafePromise(this.searchRestObject.search()).then(() => {
            this.setState({ loaded: new Date().getTime() })
        }).catch(() => {

        })
    }

    componentDidMount() {
        this.opinion = new Opinion();
        this.opinion.data.postId = this.props.postId;
        if (this.props.commentId) {
            this.opinion.data.commentId = this.props.commentId;
        }
        this.searchRestObject = new REST.SearchRESTObject(this.opinion);
        this.searchRestObject.request.query = {
            "author": REST.Headers.getUserId()
        };
        this.loadOpinions();
    }

    createOpinion(opinionType: string) {
        this.opinion.data.body = '';
        this.opinion.data._id = '';
        this.opinion.data.opinionType = opinionType;

        const { latitude, longitude } = CommonUtils.getLocation();

        this.opinion.data.location.latitude = latitude;
        this.opinion.data.location.longitude = longitude;

        REST.SafePromise(this.opinion.create()).then(() => {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Opinion Created', '');
            Publisher.opinionCreated();
            this.loadOpinions();
        }).catch(() => {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Opinion Creation Failed', '');
        })
    }

    deleteOpinion(_id: string) {
        this.opinion.data._id = _id;
        REST.SafePromise(this.opinion.delete()).then(() => {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Opinion Deleted', '');
            Publisher.opinionCreated();
            this.loadOpinions();
        }).catch(() => {
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Opinion Deletion Failed', '');
        })
    }

    render() {
        if (!this.state.loaded)
            return <span></span>

        let opinions = this.searchRestObject.response.result;

        let buttons = {
            'follow': {
                label: 'Follow',
                neglabel: 'Un-Follow',
                active: true,
                _id: ''
            },
            'upvote': {
                label: 'Up Vote',
                neglabel: 'Un-Up Vote',
                active: true,
                _id: ''
            },
            'downvote': {
                label: 'Down Vote',
                neglabel: 'Un-Down Vote',
                active: true,
                _id: ''
            },
            'spamreport': {
                label: 'Spam Report',
                neglabel: 'Un-Spam Report',
                active: true,
                _id: ''
            }
        };

        if (this.props.commentId) {
            if (this.props.postAuthorView) {
                buttons['follow']['label'] = "Mark as Resolved";
                buttons['follow']['neglabel'] = "Un-Mark as Resolved";
            } else {
                delete buttons['follow'];
            }
        }

        console.log('opinions', opinions);

        opinions.forEach((_opinion: any) => {
            console.log(_opinion);
            buttons[_opinion.data.opinionType].active = false;
            buttons[_opinion.data.opinionType]._id = _opinion.data._id;
        })



        return (
            <div>
                <br />
                {
                    Object.keys(buttons).map((buttonType: string) => {
                        return (
                            //@ts-ignore
                            <>
                                <Button
                                    onClick={() => {
                                        if (buttons[buttonType].active)
                                            this.createOpinion(buttonType);
                                        else
                                            this.deleteOpinion(buttons[buttonType]._id);
                                    }}>
                                    {buttons[buttonType].active ? buttons[buttonType].label : buttons[buttonType].neglabel}
                                </Button>{'   '}
                            </>
                        )
                    })
                }
            </div>);
    }
}
