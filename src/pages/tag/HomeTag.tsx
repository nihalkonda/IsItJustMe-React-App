import React, { Component } from 'react'
import MyTags from '../../components/molecules/MyTags';
import { ITag, Tag } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';

export default class HomeTag extends Component {

    state={
        loaded:0
    };

    searchRestObject:SearchRESTObject<ITag>;


    componentDidMount(){
        this.searchRestObject = new SearchRESTObject(new Tag());
        this.searchRestObject.request.sort={
            "count":-1
        };
        this.searchRestObject.request.pageSize=-5497;
        this.searchRestObject.search().then(()=>{
            this.setState({loaded:new Date().getTime()});
        }).catch(()=>{

        })
    }

    render() {
        if(!this.state.loaded){
            return <span></span>;
        }
        return (
            <div>
                <h1>Available Tags</h1>
                <MyTags tags={this.searchRestObject.response.result.map((t)=>t.data)}/>
            </div>
        )
    }
}
