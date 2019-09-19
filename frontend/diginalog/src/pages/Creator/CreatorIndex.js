import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import SearchCreators from "./SearchCreators";
import CreatorInfoDetail from "./CreatorInfoDetail";

export default class CreatorIndex extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path ="/Creator/SearchCreators" component={SearchCreators}></Route>
        </Switch>
      </>
    )
  }
}