import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./MainPage/Home";
import {connect} from 'react-redux';
import Home from "./Home";
import Menu from "./Menu";
import UserIndex from "./User/UserIndex";
import {AdminIndex} from "./Admin/AdminIndex";
import CreatorIndex from "./Creator/CreatorIndex";
import AuthIndex from "./Auth/AuthIndex";
import {getProfileFetch} from '../redux/actions';

class Root extends Component {
  componentDidMount = () => {
    //this.props.getProfileFetch()
  }
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
const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(null, mapDispatchToProps)(Root);