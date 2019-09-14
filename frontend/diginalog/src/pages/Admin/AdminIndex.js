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
  UncontrolledDropdown
} from "reactstrap";

import "./AdminIndex.scss"
import AdminProducts from "./AdminProducts";
export class AdminIndex extends Component {
  render() {
    return (
      <>
        <Nav className="mb-3">
          <NavItem>
            <NavLink to="/admin/products" className="nav-link">Products</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/heroes/register" className="nav-link">Unapproved</NavLink>
          </NavItem>
        </Nav>
        <Switch>
          {/*<Route path="/heroes/hero" component={Heroes}></Route>*/}
          <Route path="/admin/products" component={AdminProducts}></Route>
          <Route path="/admin" render={()=><Redirect to="/admin" />}></Route>
        </Switch>
      </>
    )
  }
}
