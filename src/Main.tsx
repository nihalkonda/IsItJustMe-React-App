import React, { Component } from 'react'
import Test from './pages/Test';
import Header from './components/layout/Header';
import { REST } from 'nk-rest-js-library';

import { Switch, Route, Router, useHistory, BrowserRouter } from "react-router-dom";

import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import SignOut from './pages/auth/SignOut';
import UserProfile from './pages/user/UserProfile';
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
import AboutUs from './pages/AboutUs';
import * as NkReactLibrary from 'nk-react-library';
import { Auth } from './rest/data/user-management';
import NF404 from './pages/NF404';
import NkRedirect from './components/atoms/NkRedirect';
import Strings from './utils/Strings';
import Dictionary from './raw/dictionary';

export default function Main() {
    React.useEffect(() => {
        REST.RESTOperations.setAccessTokenFetcher(Auth.getAccessToken);

        REST.SafePromiseHandlers.setHandlers({
            handleTokenError: () => {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/auth/sign_in');
            },
            handleNetworkError: () => {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/oops');
            },
            handleConfirmationNeededError: () => {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/auth/confirmation_token');
            },
            handleNotFoundError: () => {
                NkReactLibrary.Utils.NkReactUtils.Redirect.redirect('/404');
            }
        });
    }, [])

    return (
        <BrowserRouter>
            {/* <Router history={useHistory()}> */}
            <NkRedirect />
            <NkReactLibrary.Components.NkContainer headerComponent={<Header />} requireLocation dictionary={Dictionary}>
                <Switch>
                    <Route exact path="/" >
                        <h1>
                            <NkReactLibrary.Components.Commons.NkLocalizeText
                                text={Dictionary["Home, {firstName}!, {firstName}!"].english}
                                map={{
                                    firstName: 'Nihal'
                                }} />
                        </h1>
                        {/* <Redirect to="/post" /> */}
                        <Test />
                    </Route>
                    <Route exact path="/oops">
                        <Oops />
                    </Route>
                    <Route exact path="/404">
                        <NF404 />
                    </Route>
                    <Route exact path="/about_us">
                        <AboutUs />
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

                    <Route exact path="/user/:userId" render={(props) => <UserProfile userId={props.match.params.userId} />} />

                    <Route exact path="/post">
                        <HomePost />
                    </Route>
                    <Route exact path="/post/create">
                        <CreatePost />
                    </Route>
                    <Route exact path="/post/:postId" render={(props) => <ReadPost postId={props.match.params.postId} />} />
                    <Route exact path="/post/:postId/update" render={(props) => <UpdatePost postId={props.match.params.postId} />} />
                    <Route exact path="/post/:postId/delete" render={(props) => <DeletePost postId={props.match.params.postId} />} />

                    <Route exact path="/post/:postId/comment/:commentId" render={(props) => <ReadComment postId={props.match.params.postId} commentId={props.match.params.commentId} />} />
                    <Route exact path="/post/:postId/comment/:commentId/update" render={(props) => <UpdateComment postId={props.match.params.postId} commentId={props.match.params.commentId} />} />
                    <Route exact path="/post/:postId/comment/:commentId/delete" render={(props) => <DeleteComment postId={props.match.params.postId} commentId={props.match.params.commentId} />} />
                    <Route exact path="/tag">
                        <HomeTag />
                    </Route>
                    <Route exact path="/tag/:tagId" render={(props) => <ReadTag tagId={props.match.params.tagId} />} />

                </Switch>
            </NkReactLibrary.Components.NkContainer>
            {/* </Router> */}
        </BrowserRouter>
    )
}
