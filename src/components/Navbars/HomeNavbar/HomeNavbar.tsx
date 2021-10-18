/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import {
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

import { Navbar, NavbarBrand, NavLink } from './styles';
import ModalAbout from '../../ModalAbout/ModalAbout';

class HomeNavbar extends Component {
  state = {
    isOpen: false,
    openModal: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleOpenModal = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  render() {
    return (
      <Router>
        <ModalAbout show={this.state.openModal} setShow={this.toggleOpenModal} />
        <Navbar dark expand="md">
          <MDBNavbarBrand>
            <NavbarBrand className="white-text">PokéDex</NavbarBrand>
          </MDBNavbarBrand>

          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <NavLink to="/" onClick={() => window.location.assign('/')}>Home</NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink to="/" onClick={this.toggleOpenModal}>About</NavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </Navbar>
      </Router>
    );
  }
}

export default HomeNavbar;
