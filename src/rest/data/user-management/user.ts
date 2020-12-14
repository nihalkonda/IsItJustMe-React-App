import { API } from '../../rest/api';
import { REST } from 'nk-rest-js-library';

interface IUser {
    _id: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    displayPicture: string;
    [props: string]: any;
}

class User extends REST.RESTObject<IUser>{

    constructor() {
        super(API.USER);
        this.overloadables.init = () => {
            this.setData({
                _id: '',
                userId: '',
                email: '',
                firstName: '',
                lastName: '',
                displayPicture: '',
                customAttributes: {},
                createdAt: 0,
                lastModifiedAt: 0
            });
        };

        this.overloadables.newInstance = () => {
            return new User();
        }

        this.overloadables.formulateUpdateUrl = () => {
            return this.getApi()();
        }

        this.overloadables.creationPacket = () => {
            throw new Error('User is not creatable.');
        }

        this.overloadables.updationPacket = () => {
            return {
                firstName: this.data.firstName || '',
                lastName: this.data.lastName || '',
                displayPicture: this.data.displayPicture || ''
            }
        }

        this.overloadables.init();
    }

    async getMe() {
        this.data._id = 'me';
        await this.read();
    }

}

export type {
    IUser
}

export {
    User
}