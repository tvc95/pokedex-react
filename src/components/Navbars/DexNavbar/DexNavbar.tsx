/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  MDBCollapse,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
} from 'mdbreact';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MDexNavbar, NavbarBrandLink, NavLink } from './styles';

class DexNavbar extends Component {
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
      <>
        <Router>
          <MDexNavbar dark expand="md">
            <MDBNavbarBrand>
              <NavbarBrandLink to="/dexlist" onClick={() => window.history.back()}>
                <svg style={{ paddingTop: '0.25rem' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                </svg>
              </NavbarBrandLink>
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
          </MDexNavbar>
        </Router>
      </>
    );
  }
}

export default DexNavbar;
