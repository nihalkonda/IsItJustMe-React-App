import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import SearchResults from '../../components/templates/SearchResults';
import { IPost, Post } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';
import * as CommonUtils from '../../utils/common.utils';

export default class HomePost extends Component {
    
    render() {
        const LOCATION_DELTA = 0.03625;

        const {latitude,longitude} = CommonUtils.getLocation();

        return (
            <div>
                <br/>
                <Button as={Link} to="/post/create">Create Post</Button>
                <br/>
                <br/>
                <SearchResults itemType='post' item={new Post()} 
                quickFilters={[
                    {
                        label:'Latest',
                        filter:{
                            sort:{
                                "createdAt":-1
                            },
                            query:{
                                "isDeleted":false
                            }
                        }
                    },
                    {
                        label:'Oldest',
                        filter:{
                            sort:{
                                "createdAt":1
                            },
                            query:{
                                "isDeleted":false
                            }
                        }
                    },
                    {
                        label:'Near Me',
                        filter:{
                            sort:{
                                "stats.score":-1,
                                "createdAt":-1
                            },
                            query:{
                                "isDeleted":false,
                                "location.latitude":{
                                    "$gt":latitude-LOCATION_DELTA,
                                    "$lt":latitude+LOCATION_DELTA
                                },
                                "location.longitude":{
                                    "$gt":longitude-LOCATION_DELTA,
                                    "$lt":longitude+LOCATION_DELTA
                                }
                            }
                        }
                    }
                ]}
                />
            </div>
        )
    }
}
