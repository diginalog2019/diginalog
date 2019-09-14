import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import SearchCreators from "./Creator/SearchCreators";
import CreatorInfo from "./Creator/CreatorInfo";

export class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Menu/>
          <div className="container" style={{backgroundColor: '#ffffff'}}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path = "/Creator/SearchCreators" component = {SearchCreators}></Route>
              <Route path = "/Creator/SearchCreators/:creatorCID([0-9]+)" component = {CreatorInfo}></Route>
            </Switch>
          </div>

        </>
      </BrowserRouter>
    )
  }
}