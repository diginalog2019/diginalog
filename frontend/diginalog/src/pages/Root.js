import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import {Register} from "./Creator/Register";

export class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Menu/>
          <div className="container" style={{backgroundColor: '#ffffff'}}>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              /* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
              <Route path="/Creator/Register" component={Register}></Route>
              /* Kwon Na Hyun : 2019.08.31 Fin -------------------------------------------*/
            </Switch>
          </div>

        </>
      </BrowserRouter>
    )
  }
}