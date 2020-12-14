import { REST } from 'nk-rest-js-library';
import React from 'react'
import MyChip from '../../components/atoms/tag/MyTag';
import { Tag } from '../../rest/data/posts';

export default function HomeTag() {
    const [searchRestObject] = React.useState(new REST.SearchRESTObject(new Tag()));

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        searchRestObject.request.sort = {
            "count": -1
        };
        searchRestObject.request.pageSize = -5497;
        REST.SafePromise(searchRestObject.search()).then(() => {
            setLoaded(true);
        }).catch(() => {

        })
    }, [])

    if (!loaded)
        return <></>

    return (
        <div>
            <h4>Displaying {searchRestObject.response.resultSize} of {searchRestObject.response.resultTotalSize} tags.</h4>
            <div>
                {
                    searchRestObject.response.result.map(t => <MyChip tag={t.data} />)
                }
            </div>
        </div>
    )
}