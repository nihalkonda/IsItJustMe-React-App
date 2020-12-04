import React, { Component } from 'react';
import {Navbar,Nav, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Headers from '../../rest/rest/headers';
import {PubSub,Subscriber,Topic} from '../../utils/pubsub';

export default class Header extends Component implements Subscriber{

    state = {
        showCollapedMenu : false
    };

    processMessage(topic:string,message:any){
        console.log('Header','processMessage','topic',topic,'message',message);
        if(topic === Topic.AUTH.LOGIN_STATUS_CHANGED){
            this.forceUpdate();
        }
    }

    componentDidMount(){
        PubSub.subscribe(Topic.AUTH.LOGIN_STATUS_CHANGED,this);
    }

    render() {
        type link={name:string,url:string};
        let links:link[] = [
            //{name:"Home",url:"/"},
            {name:"Posts",url:"/post"},
            {name:"Tags",url:"/tag"},
            {name:"About Us",url:"/about_us"},
        ];

        if(Headers.isUserLoggedIn()){
            links.push({
                name:"My Profile",
                url:"/user/me"
            });
            links.push({
                name:"Sign Out",
                url:"/auth/sign_out"
            });
        }else{
            links.push({
                name:"Sign Up",
                url:"/auth/sign_up"
            });
            links.push({
                name:"Sign In",
                url:"/auth/sign_in"
            });
        }

        return (
            <Navbar bg="light" expand="lg" expanded={this.state.showCollapedMenu}>
                <Container>
                    <Navbar.Brand as={Link} to="/" >Is It Just Me</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>{
                        this.setState({showCollapedMenu:!this.state.showCollapedMenu});
                    }}/>
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="ml-auto" >
                            {
                                links.map((link:link)=>{
                                    return <Nav.Link 
                                                as={Link} 
                                                to={link.url} 
                                                key={link.url} 
                                                className="ml-auto" 
                                                onClick={()=>{
                                                    this.setState({showCollapedMenu:false});
                                                }}>{link.name}</Nav.Link>
                                            }
                                        )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
