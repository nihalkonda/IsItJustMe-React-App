import { REST } from 'nk-rest-js-library';
import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as NkReactLibrary from 'nk-react-library';

export default function UserProfile({ firstName, lastName, email, userId, displayPicture }: {
    firstName: string,
    lastName: string,
    email: string,
    userId: string,
    displayPicture: string
}) {
    let extraPanel = [];

    if (REST.Headers.getUserId() === userId) {
        extraPanel.push(<Button as={Link} to="/user/update">Update Profile</Button>);
        extraPanel.push(<br />);
        if (REST.Headers.isUserConfirmed()) {
            extraPanel.push(<h6>Account is confirmed.</h6>);
        } else {
            extraPanel.push(<Button as={Link} to="/auth/confirmation_token">Confirm Account</Button>)
        }
        extraPanel.push(<br />);
    }

    return (
        <div>
            <NkReactLibrary.Components.Commons.NkImage src={displayPicture} circle={true} border={true} />
            <h1>{`${firstName} ${lastName}`}</h1>
            <h5>{`${email} | ${userId}`}</h5>
            <br />
            {
                extraPanel
            }
        </div>
    )
}
