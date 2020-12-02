import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

import { IPost, Post, Tag } from '../../rest/data/posts';
import SearchRESTObject from '../../rest/rest/search.rest.object';

import * as CommonUtils from '../../utils/common.utils';

export default class ReadTag extends Component<{
    [key: string]: any
}> {

    tag: Tag;

    searchRestObject:SearchRESTObject<IPost>;

    state :{
        loaded:number,
        heatMapData:GoogleMapReact.Position[]
    } = {
        loaded: 0,
        heatMapData:[]
    }

    componentDidMount() {
        this.tag = new Tag();
        this.tag.data._id = this.props.match.params.tagId;
        this.searchRestObject = new SearchRESTObject(new Post());
        this.tag.read().then(() => {
            this.searchRestObject.request.query={
                "content.tags":this.tag.data.tag
            };
            this.searchRestObject.request.attributes=["createdAt","location"];
            this.searchRestObject.request.pageSize=-5497;
            this.searchRestObject.search().then(()=>{
                
                const temp:GoogleMapReact.Position[] = [];

                console.log(this.searchRestObject.response.result)

                this.searchRestObject.response.result.forEach((post)=>{
                    console.log(post.data.createdAt,post.data.location.latitude,post.data.location.longitude);
                    temp.push({lat:post.data.location.latitude,lng:post.data.location.longitude});
                })

                this.setState({
                    loaded:new Date().getTime(),
                    heatMapData:temp
                })

            }).catch(()=>{

            });
        }).catch(() => {

        });
    }

    render() {
        if (!this.state.loaded) {
            return <span></span>
        }

        console.log(this.state);

        return (
            <div>
                <h1>Map</h1>
                <br/>
                <div style={{width: "100%", height: 500}}>
                    <GoogleMapReact
                        yesIWantToUseGoogleMapApiInternals={true}
                        bootstrapURLKeys={{ key: 'AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60' }}
                        defaultCenter={{
                            lat: CommonUtils.getLocation().latitude,
                            lng: CommonUtils.getLocation().longitude
                        }}
                        defaultZoom={11}
                        heatmapLibrary={true}          
                        heatmap={{
                            positions:this.state.heatMapData,
                            options:{}
                        }}
                    >

                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}
