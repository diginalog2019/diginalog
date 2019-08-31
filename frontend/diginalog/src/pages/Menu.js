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
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavLink to="/" className="navbar-brand">Diginalog</NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/heroes" className="nav-link">Product</NavLink>
              </NavItem>
              /* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Creator
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink to="/Creator/Search" >Search</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/Creator/Register" >Register</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              /* Kwon Na Hyun : 2019.08.31 fin-------------------------------------------*/
              <NavItem>
                <NavLink to="/todo" className="nav-link">Admin</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
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
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

export default Menu;