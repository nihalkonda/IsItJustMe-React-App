import { Services } from 'nk-js-library';
import { REST } from 'nk-rest-js-library';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Headers from '../../rest/rest/headers';
import Topic from '../../utils/pubsub/topic';
import HeaderLanguageSelector from './HeaderLanguageSelector';
import * as NkReactLibrary from 'nk-react-library';

export default function Header() {
    const [showCollapsedMenu, setShowCollapsedMenu] = useState(false);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        Services.PubSubService.Organizer.addSubscriber(Topic.AUTH.LOGIN_STATUS_CHANGED, {
            processMessage: (message) => {
                console.log('Header', 'processMessage', 'message', message);
                if (message.type === Topic.AUTH.LOGIN_STATUS_CHANGED) {
                    setUpdate(new Date().getTime());
                }
            }
        });
    }, [])

    const links = [
        //{name:"Home",url:"/"},
        { name: "Posts", url: "/post" },
        { name: "Tags", url: "/tag" },
        { name: "About Us", url: "/about_us" },
    ];

    if (REST.Headers.isUserLoggedIn()) {
        links.push({
            name: "My Profile",
            url: "/user/me"
        });
        links.push({
            name: "Sign Out",
            url: "/auth/sign_out"
        });
    } else {
        links.push({
            name: "Sign Up",
            url: "/auth/sign_up"
        });
        links.push({
            name: "Sign In",
            url: "/auth/sign_in"
        });
    }

    return (
        <Navbar bg="light" expand="lg" expanded={showCollapsedMenu} key={update}>
            <Container>
                <Navbar.Brand as={Link} to="/" >Is It Just Me</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {
                    setShowCollapsedMenu(!showCollapsedMenu);
                }} />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ml-auto" >
                        {
                            links.map((link) => {
                                return <Nav.Link
                                    as={Link}
                                    to={link.url}
                                    key={link.url}
                                    className="ml-auto"
                                    onClick={() => {
                                        setShowCollapsedMenu(false)
                                    }}><NkReactLibrary.Components.Commons.NkLocalizeText text={link.name} /></Nav.Link>
                            }
                            )
                        }
                        <HeaderLanguageSelector />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}