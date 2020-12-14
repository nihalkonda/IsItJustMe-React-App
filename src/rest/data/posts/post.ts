import { REST } from 'nk-rest-js-library';
import { ILocation, IStats } from './schemas';
import { IUser } from '../user-management/user';
import { API } from '../../rest/api';
import { ITag } from './tag';

interface IPost {
    _id: string;
    author: IUser;
    content: {
        title: string,
        body: string,
        tags: ITag[] | string[]
    };
    isDeleted: boolean;
    location: ILocation;
    stats: IStats;
    createdAt: any;
    lastModifiedAt: any;
    threadLastUpdatedAt: any;
    [prop: string]: any;
}

class Post extends REST.RESTObject<IPost>{

    constructor() {
        super(API.POST);
        this.overloadables.init = () => {
            this.setData({
                _id: '',
                author: {
                    _id: '',
                    userId: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    displayPicture: ''
                },
                content: {
                    title: '',
                    body: '',
                    tags: []
                },
                isDeleted: false,
                location: {
                    _id: '',
                    latitude: 0.0,
                    longitude: 0.0
                },
                stats: {
                    _id: '',
                    downvoteCount: 0,
                    followCount: 0,
                    score: 0,
                    spamreportCount: 0,
                    upvoteCount: 0,
                    viewCount: 0,
                    commentCount: 0,
                    updateCount: 0,
                    resolveCount: 0
                },
                createdAt: 0,
                lastModifiedAt: 0,
                threadLastUpdatedAt: 0
            });
        };

        this.overloadables.newInstance = () => {
            return new Post();
        }

        this.overloadables.creationPacket = () => {
            let extras = {};
            if (this.data.location.latitude) {
                extras = {
                    location: {
                        latitude: this.data.location.latitude,
                        longitude: this.data.location.longitude,
                        raw: this.data.location.raw
                    }
                };
            }

            return {
                content: {
                    title: this.data.content.title || '',
                    body: this.data.content.body || '',
                    tags: this.data.content.tags || []
                },
                ...extras
            }
        }

        this.overloadables.updationPacket = () => {
            return this.overloadables.creationPacket();
        }

        this.overloadables.init();
    }

    get_id() {
        return this.data._id;
    }

    set_id(_id: string) {
        this.data._id = _id;
    }

}

export type {
    IPost
}

export {
    Post
}