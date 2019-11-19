import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import SearchCreators from "./SearchCreators";
import {Register} from "./Register";
import CreatorInfoDetail from "./CreatorInfoDetail";

export default class CreatorIndex extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path ="/Creator/SearchCreators" component={SearchCreators}></Route>
          <Route path ="/Creator/product" component={CreatorInfoDetail}></Route>
          <Route path="/Creator/Register" component={Register}></Route>
        </Switch>
      </>
    )
  }
}