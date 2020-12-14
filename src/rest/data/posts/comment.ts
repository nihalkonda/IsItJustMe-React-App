import { REST } from 'nk-rest-js-library';
import { ILocation, IStats } from './schemas';
import { IUser } from '../user-management/user';
import { API } from '../../rest/api';

interface IComment {
    _id: string;
    author: IUser;
    postId: string;
    content: string;
    context: string;
    isDeleted: boolean;
    location: ILocation;
    stats: IStats;
    createdAt: any;
    lastModifiedAt: any;
    [prop: string]: any;
}

class Comment extends REST.RESTObject<IComment>{

    constructor() {
        super(API.COMMENT);
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
                postId: '',
                content: '',
                context: '',
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
                lastModifiedAt: 0
            });
        };

        this.overloadables.newInstance = () => {
            return new Comment();
        }

        this.overloadables.creationPacket = () => {
            let extras = {};
            if (this.data.location.latitude) {
                extras = {
                    location: {
                        latitude: this.data.location.latitude || 0.0,
                        longitude: this.data.location.longitude || 0.0,
                        raw: this.data.location.raw
                    }
                };
            }
            return {
                content: this.data.content || '',
                context: this.data.context || 'general',
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
    IComment
}

export {
    Comment
}