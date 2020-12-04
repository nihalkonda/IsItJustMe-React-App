import React, { Component } from 'react'
import MyImage from '../../atoms/MyImage';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import headers from '../../../rest/rest/headers';
import SearchResults from '../../templates/SearchResults';
import {Post} from '../../../rest/data/posts';

export default class UserProfile extends Component<{
    firstName:string,
    lastName:string,
    email:string,
    userId:string,
    displayPicture:string
}> {
    render() {
        let extraPanel = [];

        if(headers.getUserId() === this.props.userId){
            extraPanel.push(<Button as={Link} to="/user/update">Update Profile</Button>);
            extraPanel.push(<br/>);
            if(headers.isUserConfirmed()){
                extraPanel.push(<h6>Account is confirmed.</h6>);
            }else{
                extraPanel.push(<Button as={Link} to="/auth/confirmation_token">Confirm Account</Button>)
            }
            extraPanel.push(<br/>);
        }

        return (
            <div>
                <MyImage src={this.props.displayPicture} circle={true} border={true}/>
                <h1>{`${this.props.firstName} ${this.props.lastName}`}</h1>
                <h5>{`${this.props.email} | ${this.props.userId}`}</h5>
                <br/>
                {
                    extraPanel
                }
                <hr/>
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
                                    "author":this.props.userId
                                }
                            }
                        }
                    ]}
                />
            </div>
        )
    }
}
