import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import './Products/UserProducts.module.scss';
import './UserIndex.scss';
import {
    Nav,
    NavItem} from 'reactstrap';
import UserProducts from './Products/ViewProducts';
import Test from './Products/test';
import Product from "./Product/Product";
import ViewProducts from "./Products/ViewProducts";
import ViewHashtags from "./Products/ViewHashtags";
import ProductsByHashtag from "./Products/ProductsByHashtag";

export default class UserIndex extends Component {
    render() {
        return (
            <>
                <Nav className={"mb-3"}>
                    <NavItem>
                        <NavLink to="/user/products" className="nav-link">All</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/user/hashtags" className="nav-link">Hashtags</NavLink>
                    </NavItem>
                </Nav>
                <Switch>
                    <Route path="/user/product" component={Product}></Route>
                    <Route path="/user/products" component={UserProducts}></Route>
                    <Route path="/user/productsByHashtag" component={ProductsByHashtag}></Route>
                    <Route path="/user/test" component={Test}></Route>
                    <Route path="/user/product" component={ViewProducts}></Route>
                    <Route path="/user/hashtags" component={ViewHashtags}></Route>
                    <Route path ="/user" render = {()=><Redirect to="/user/products"/>}/>
                </Switch>
            </>
        )
    }
}
