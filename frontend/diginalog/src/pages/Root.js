import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import CreatorIndex from "./Creator/CreatorIndex";

export class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Menu/>
          <div className="container" style={{backgroundColor: '#ffffff'}}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path = "/Creator" component = {CreatorIndex}></Route>
            </Switch>
          </div>

        </>
      </BrowserRouter>
    )
  }
}