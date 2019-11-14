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

  render() {
    return (
      <Navbar color="white" light expand="md">
        <div className="container-fluid">
        <Nav navbar ml-md-5>
          <a className="navbar-brand" href="/" >
            <img src={process.env.PUBLIC_URL + '/images/mainLogo.png'} width="200" height="70" alt=""></img>
          </a>
        </Nav>
        <NavbarToggler onClick={this.toggle} ml-5/>
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
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Enter your search term" aria-label="Search term"
                     aria-describedby="basic-addon"></input>
              <div className="input-group-append">
                <button className="btn btn-outline-white" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </Collapse>

        </div>
      </Navbar>
    )
  }
}

export default Menu;
