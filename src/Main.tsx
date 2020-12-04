import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-quill/dist/quill.snow.css';
import './css/quill.css';
import Test from './pages/Test';
import Header from './components/layout/Header';
import Headers from './rest/rest/headers';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { Container } from 'react-bootstrap';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import SignOut from './pages/auth/SignOut';
import UserProfile from './pages/user/UserProfile';
import ToastPanel from './components/organisms/ToastPanel';
import MyRedirect from './components/atoms/MyRedirect';
import ConfirmationToken from './pages/auth/ConfirmationToken';
import UpdateProfile from './pages/user/UpdateProfile';
import CreatePost from './pages/post/CreatePost';
import ReadPost from './pages/post/ReadPost';
import UpdatePost from './pages/post/UpdatePost';
import HomePost from './pages/post/HomePost';
import Oops from './pages/Oops';
import ReadComment from './pages/comment/ReadComment';
import UpdateComment from './pages/comment/UpdateComment';
import DeletePost from './pages/post/DeletePost';
import DeleteComment from './pages/comment/DeleteComment';
import HomeTag from './pages/tag/HomeTag';
import ReadTag from './pages/tag/ReadTag';
import LocationLoader from './components/atoms/LocationLoader';

import * as CommonUtils from './utils/common.utils';
import AboutUs from './pages/AboutUs';

export default class Main extends Component {
    render() {

        Headers.loadData();

        return (
            <div>
                <LocationLoader onSuccess={(position) => {
                    console.log(position)
                    CommonUtils.saveLocation(position.coords.latitude,position.coords.longitude);
                }} label='' />
                <Router>
                    <MyRedirect />
                    <Header />
                    <Container style={{
                        position: 'relative'
                    }}>
                        <Switch>
                            <Route exact path="/" >
                                <h1>Home</h1>
                                <Redirect to="/post"/>

                            </Route>
                            <Route exact path="/oops">
                                <Oops />
                            </Route>
                            <Route exact path="/about_us">
                                <AboutUs/>
                            </Route>
                            <Route exact path="/auth/sign_up">
                                <SignUp />
                            </Route>
                            <Route exact path="/auth/sign_in">
                                <SignIn />
                            </Route>
                            <Route exact path="/auth/sign_out">
                                <SignOut />
                            </Route>
                            <Route exact path="/auth/confirmation_token">
                                <ConfirmationToken />
                            </Route>

                            <Route exact path="/user/update">
                                <UpdateProfile />
                            </Route>

                            <Route exact path="/user/:userId" render={(props) => <UserProfile {...props} />} />

                            <Route exact path="/post">
                                <HomePost />
                            </Route>
                            <Route exact path="/post/create">
                                <CreatePost />
                            </Route>
                            <Route exact path="/post/:postId" render={(props) => <ReadPost {...props} />} />
                            <Route exact path="/post/:postId/update" render={(props) => <UpdatePost {...props} />} />
                            <Route exact path="/post/:postId/delete" render={(props) => <DeletePost {...props} />} />

                            <Route exact path="/post/:postId/comment/:commentId" render={(props) => <ReadComment {...props} />} />
                            <Route exact path="/post/:postId/comment/:commentId/update" render={(props) => <UpdateComment {...props} />} />
                            <Route exact path="/post/:postId/comment/:commentId/delete" render={(props) => <DeleteComment {...props} />} />
                            <Route exact path="/tag">
                                <HomeTag />
                            </Route>
                            <Route exact path="/tag/:tagId" render={(props) => <ReadTag {...props} />} />

                        </Switch>
                        <ToastPanel />
                    </Container>
                </Router>
            </div>
        )
    }
}
