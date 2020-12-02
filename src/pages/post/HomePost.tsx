import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import SearchResults from '../../components/templates/SearchResults';
import { IPost, Post } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';
export default class HomePost extends Component {
    render() {
        return (
            <div>
                <br/>
                <Button as={Link} to="/post/create">Create Post</Button>
                <br/>
                <br/>
                <SearchResults itemType='post' item={new Post()}/>
            </div>
        )
    }
}
