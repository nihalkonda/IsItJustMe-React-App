import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import TagInput from '../../components/atoms/form/TagInput';
import SearchResults from '../../components/templates/SearchResults';
import { IPost, Post } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';
import * as CommonUtils from '../../utils/common.utils';

export default class HomePost extends Component {

    state = {
        filterLabel:'Latest',
        tags:[]
    }

    sr:SearchResults;

    render() {
        const LOCATION_DELTA = 0.03625;

        const { latitude, longitude } = CommonUtils.getLocation();

        let extraQuery = {};

        if (this.state.tags.length > 0) {
            extraQuery = {
                "content.tags": {
                    "$in": this.state.tags
                }
            }
        }

        return (
            <div>
                <br />
                <table>
                    <tr>
                        <td valign="top">
                        <TagInput id='' type='' label='Please enter the search tags below.' valueChanged={(id, tags) => {
                            console.log('HomePost', tags);
                            this.setState({tags});
                        }} />
                        </td>
                        <td  valign="top">
                        <Button onClick={()=>{this.sr.rerunFilter();}} style={{margin:'40px 10px'}}>Search</Button>
                        </td>
                        <td valign="top">
                        <Button as={Link} to="/post/create"  style={{margin:'40px 10px'}}>Create Post</Button>
                        </td>
                    </tr>
                </table>
                <br />
                <SearchResults  ref={(sr)=>{this.sr=sr;}} itemType='post' item={new Post()}
                    filterSelectionChanged={(label)=>{
                        this.setState({filterLabel:label});
                    }}
                    runFilter={this.state.filterLabel}
                    quickFilters={[
                        {
                            label: 'Latest',
                            filter: {
                                sort: {
                                    "createdAt": -1
                                },
                                query: {
                                    "isDeleted": false,
                                    ...extraQuery
                                }
                            }
                        },
                        {
                            label: 'Oldest',
                            filter: {
                                sort: {
                                    "createdAt": 1
                                },
                                query: {
                                    "isDeleted": false,
                                    ...extraQuery
                                }
                            }
                        },
                        {
                            label: 'Near Me',
                            filter: {
                                sort: {
                                    "stats.score": -1,
                                    "createdAt": -1
                                },
                                query: {
                                    "isDeleted": false,
                                    "location.latitude": {
                                        "$gt": latitude - LOCATION_DELTA,
                                        "$lt": latitude + LOCATION_DELTA
                                    },
                                    "location.longitude": {
                                        "$gt": longitude - LOCATION_DELTA,
                                        "$lt": longitude + LOCATION_DELTA
                                    },
                                    ...extraQuery
                                }
                            }
                        }
                    ]}
                />
            </div>
        )
    }
}
