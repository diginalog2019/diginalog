import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import UserIndex from "./User/UserIndex";
import Product from "./User/Product/Product";
import {AdminIndex} from "./Admin/AdminIndex";

export class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Menu/>
          <div className="container" style={{backgroundColor: '#ffffff'}}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/user" component={UserIndex}></Route>
              <Route path="/user/product" component={UserIndex}></Route>
              <Route path="/admin" component={AdminIndex}></Route>
            </Switch>
          </div>

        </>
      </BrowserRouter>
    )
  }
}
