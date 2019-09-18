import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from "react-router-dom";
import SearchCreators from "./SearchCreators";

export default class CreatorIndex extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path ="/creator/SearchCreators" component={SearchCreators}></Route>
        </Switch>
      </>
    )
  }
}