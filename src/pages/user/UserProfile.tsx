import React from 'react'
import { User } from '../../rest/data/user-management';
import UserProfile from '../../components/molecules/fullview/UserProfile';
import { Post } from '../../rest/data/posts';
import SearchResults from '../../components/templates/SearchResults';
import { REST } from 'nk-rest-js-library';

export default function MyProfile({ userId }: { userId: string }) {
    const [user] = React.useState(new User());
    const [loaded, setLoaded] = React.useState(0);

    React.useEffect(() => {
        user.data._id = userId;
        REST.SafePromise(user.read()).then((result) => {
            console.log('User', 'Me', 'result', result);
            setLoaded(new Date().getTime());
        }).catch((err) => {
            console.log('User', 'Me', 'err', err, 'name', err.name, 'message', err.message, 'response', err.response);
        })
    }, [])

    if (!loaded)
        return <></>

    return (
        <div>
            <UserProfile {...user.data} />
            <hr />
            <SearchResults itemType='post' item={new Post()}
                quickFilters={[
                    {
                        label: 'Posts',
                        filter: {
                            sort: {
                                "createdAt": -1
                            },
                            query: {
                                "isDeleted": false,
                                "author": user.data.userId
                            }
                        }
                    }
                ]}
            />
        </div>
    )
}