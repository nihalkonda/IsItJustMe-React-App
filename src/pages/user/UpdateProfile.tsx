import { REST } from 'nk-rest-js-library';
import React from 'react'
import { User } from '../../rest/data/user-management';
import * as NkReactLibrary from 'nk-react-library';

export default function UpdateProfile() {

    const [user] = React.useState(new User());

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        REST.SafePromise(user.getMe()).then((result) => {
            console.log('User', 'Me', 'result', result);
            setLoaded(true);
        }).catch((err) => {
            console.log('User', 'Me', 'err', err);
        })
    }, [])

    if (!loaded) return <></>;

    return <NkReactLibrary.Components.NkForm title="Update Profile" description="Update your profile." formConfig={[
        {
            id: 'firstName',
            type: 'input',
            label: 'First Name',
            defaultValue: user.data.firstName
        },
        {
            id: 'lastName',
            type: 'input',
            label: 'Last Name',
            defaultValue: user.data.lastName
        },
        {
            id: 'displayPicture',
            type: 'input',
            label: 'Display Picture URL',
            defaultValue: user.data.displayPicture
        },
        {
            id: 'submit',
            type: 'submit',
            label: 'Update Profile'
        }
    ]} formSubmit={(result) => {
        console.log('submitted', result);

        user.data.firstName = result.firstName;
        user.data.lastName = result.lastName;
        user.data.displayPicture = result.displayPicture;

        REST.SafePromise(user.update()).then((result) => {
            console.log('UpdateProfile', 'formSubmit', 'update', 'result', result);

            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Profile Updated', 'Your profile is updated.');
            NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/user/me');

        }).catch((error) => {
            console.log('UpdateProfile', 'formSubmit', 'update', 'error', error);
            NkReactLibrary.Utils.NkReactUtils.ToastPanel.addToast('Profile Update Failed', 'Your profile update has failed.');
        })

    }} />;

}