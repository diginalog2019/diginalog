import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./MainPage/Home";
import Menu from "./Menu";
import UserIndex from "./User/UserIndex";
import {AdminIndex} from "./Admin/AdminIndex";
import CreatorIndex from "./Creator/CreatorIndex";

export class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Menu/>
          <div className="bg" style={{backgroundColor: '#ffffff'}}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/user" component={UserIndex}></Route>
              <Route path="/user/product" component={UserIndex}></Route>
              <Route path="/admin" component={AdminIndex}></Route>
              <Route path = "/Creator" component = {CreatorIndex}></Route>
            </Switch>
          </div>
        </>
      </BrowserRouter>
    )
  }
}
