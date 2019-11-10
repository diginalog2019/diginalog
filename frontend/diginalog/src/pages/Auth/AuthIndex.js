import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import './Auth.module.scss';
import {
    Nav,
    NavItem} from 'reactstrap';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class AuthIndex extends Component {
    render() {
        return (
            <>
                <Nav className={"mb-3"}>
                    <NavItem>
                        <NavLink to="/auth/signin" className="nav-link">Sign In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/auth/signup" className="nav-link">Sign Up</NavLink>
                    </NavItem>
                </Nav>
                <Switch>
                    <Route path ="/auth/signin" component={SignIn}></Route>
                    <Route path ="/auth/signup" component={SignUp}></Route>
                    <Route path ="/auth" render = {()=><Redirect to="/auth/signin"/>}/>
                </Switch>
            </>
        )
    }
}
