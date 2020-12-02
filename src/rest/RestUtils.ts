import {ITag, Tag} from './data/posts';
import SearchRESTObject from './rest/search.rest.object';

let tagSearch:SearchRESTObject<ITag>;

const liveTagSuggestions = (text,callback) => {
    if(!tagSearch){
        tagSearch = new SearchRESTObject(new Tag());
        tagSearch.request.sort = {
            "count":-1
        };
    }

    tagSearch.request.query={"tag" : {$regex : `.*${text}.*`}};
    
    tagSearch.search().then(()=>{
        const suggestions = tagSearch.response.result.map((r)=>r.data.tag);
        callback(suggestions);
    });
}

export {
    liveTagSuggestions
}