import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {
  Collapse, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import './Menu.css';
import {connect} from "react-redux";
import {getProfileFetch, logoutUser, userLoginFetch} from "../redux/actions";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleClick = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()
  }

  render() {
    return (
      <Navbar color="white" light expand="md">
        <div className="container-fluid">
        <Nav navbar>
          <a className="navbar-brand" href="/" >
            <img src={process.env.PUBLIC_URL + '/images/mainLogo.png'} width="200" height="70" alt=""></img>
          </a>
        </Nav>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <ul className="navbar-nav mr-auto">
            <NavItem>
              <NavLink to="/user" className="nav-link">Product</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Creator
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink to="/Creator/SearchCreators">Search Creator</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to="/Creator/Register" >Register</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink to="/admin" className="nav-link">Admin</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Option
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <div className="col-md-6 mb-1">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Enter your search term" aria-label="Search term"
                     aria-describedby="basic-addon"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-white" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </Collapse>


              {this.props.currentUser.id
                  ?
                  <div>
                    Hello, {this.props.currentUser.id}!
                    <button onClick={this.handleClick} className="btn btn-outline-primary">Log Out</button>
                  </div>
                  :
                  <NavItem>
                    <NavLink to="/auth" className="nav-link">Sign In</NavLink>
                  </NavItem>
              }
        </div>
      </Navbar>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    currentUser : state.authReducer.currentUser
  }
}
const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);