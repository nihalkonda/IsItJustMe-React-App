import React, { Component } from 'react';
import { Comment, Post } from '../../rest/data/posts';
import PostView from '../../components/molecules/fullview/PostView';
import SearchResults from '../../components/templates/SearchResults';
import CreateComment from '../comment/CreateComment';
import Topic from '../../utils/pubsub/topic';
import CreateOpinion from '../opinion/CreateOpinion';
import { Services } from 'nk-js-library';
import { REST } from 'nk-rest-js-library';

export default class ReadPost extends Component<{
    postId: string
}> implements Services.PubSubService.Subscriber {
    state = {
        loaded: 0,
        opinionButtons: {}
    };

    post: Post;

    loadPost() {
        this.post = new Post();
        console.log(this.props);
        this.post.data._id = this.props.postId;
        REST.SafePromise(this.post.read(true)).then((result) => {
            console.log('Post', 'Read', 'result', result);
            this.setState({ loaded: new Date().getTime() });

        }).catch((err) => {
            console.log('Post', 'Read', 'err', err);
        })
    }

    processMessage(message: Services.PubSubService.Message) {
        if (message.type === Topic.COMMENT.CREATED || message.type === Topic.OPINION.CREATED) {
            this.loadPost();
        }
    }

    componentDidMount() {
        this.loadPost();
        Services.PubSubService.Organizer.addSubscriberAll([Topic.COMMENT.CREATED, Topic.OPINION.CREATED], this);
    }

    render() {
        if (!this.state.loaded) {
            return <div></div>
        }
        console.log(this.state, this.post);

        const isPostAuthor = this.post.data.author.userId === REST.Headers.getUserId();
        console.log('ReadPost', this.post.data.author.userId, REST.Headers.getUserId(), isPostAuthor);
        const comment = new Comment();
        comment.data.postId = this.post.data._id;
        return (
            <div>
                <PostView post={this.post} authorView={isPostAuthor} />
                <CreateOpinion postId={this.post.data._id} postAuthorView={isPostAuthor} />
                <CreateComment postId={this.post.data._id} postAuthorView={isPostAuthor} />
                <h3>Comments</h3>
                <SearchResults itemType='comment' item={comment} loaded={this.state.loaded} runFilter={'Latest'} quickFilters={[
                    {
                        label: 'Latest',
                        filter: {
                            query: {
                                'isDeleted': false
                            },
                            sort: {
                                'lastModifiedAt': -1
                            }
                        }
                    },
                    {
                        label: 'Updates',
                        filter: {
                            query: {
                                'isDeleted': false,
                                'context': 'update'
                            },
                            sort: {
                                'lastModifiedAt': -1
                            }
                        }
                    },
                    {
                        label: 'Answers',
                        filter: {
                            query: {
                                'isDeleted': false,
                                'context': 'resolve'
                            },
                            sort: {
                                'lastModifiedAt': -1
                            }
                        }
                    }
                ]} />
            </div>
        )
    }
}
