import { REST } from 'nk-rest-js-library';
import { ITag, Tag } from './data/posts';

let tagSearch: REST.SearchRESTObject<ITag>;

const liveTagSuggestions = (text, callback) => {
    if (!tagSearch) {
        tagSearch = new REST.SearchRESTObject(new Tag());
        tagSearch.request.sort = {
            "count": -1
        };
        tagSearch.request.attributes = ['tag'];
    }

    tagSearch.request.query = { "tag": { $regex: `.*${text}.*` } };

    tagSearch.search().then(() => {
        const suggestions = tagSearch.response.result.map((r) => r.data.tag);
        callback(suggestions);
    });
}

export {
    liveTagSuggestions
}