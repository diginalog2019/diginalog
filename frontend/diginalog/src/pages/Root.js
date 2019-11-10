import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import UserIndex from "./User/UserIndex";
import Product from "./User/Product/Product";
import {AdminIndex} from "./Admin/AdminIndex";
import {Register} from "./Creator/Register";
import CreatorIndex from "./Creator/CreatorIndex";
import AuthIndex from "./Auth/AuthIndex";

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
              /* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
              <Route path="/Creator/Register" component={Register}></Route>
              /* Kwon Na Hyun : 2019.08.31 Fin -------------------------------------------*/
              <Route path = "/Creator" component = {CreatorIndex}></Route>
               /*Shi Ha Yeon : 2019.11.7 ------------------------------------*/
              <Route path = "/auth" component = {AuthIndex}></Route>
               /*Shi Ha Yeon : 2019.11.7 fin ---------------------------*/
            </Switch>
          </div>

        </>
      </BrowserRouter>
    )
  }
}
