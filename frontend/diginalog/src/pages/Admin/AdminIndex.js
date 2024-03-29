import React, {Component} from 'react';
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import {
  Collapse, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdowns
} from "reactstrap";

import "./AdminIndex.scss"
import AdminProducts from "./AdminProducts";
import AdminUnapproved from "./AdminUnapproved";
import AdminCreators from "./AdminCreators";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminHashtags from "./AdminHashtags";
export class AdminIndex extends Component {
  render() {
    return (
      <>
        <div class="menu">
          <Nav className="mb-3 flex-column">
            <NavItem>
              <NavLink to="/admin/products" className="nav-link">Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/admin/unapproved" className="nav-link">Unapproved</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/admin/creators" className="nav-link">Creators</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/admin/users" className="nav-link">Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/admin/hashtags" className="nav-link">Hashtags</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div class="contents">
        <Switch>
          {/*<Route path="/heroes/hero" component={Heroes}></Route>*/}
          <Route path="/admin/products" component={AdminProducts}></Route>
          <Route path="/admin/unapproved" component={AdminUnapproved}></Route>
          <Route path="/admin/creators" component={AdminCreators}></Route>
          <Route path="/admin/product" component={AdminProduct}></Route>
          <Route path="/admin/users" component={AdminUsers}></Route>
          <Route path="/admin/hashtags" component={AdminHashtags}></Route>
          <Route path="/admin" render={()=><Redirect to="/admin" />}></Route>
        </Switch>
        </div>
      </>
    )
  }
}
