/* eslint-disable import/prefer-default-export */
import { MDBNavbar, MDBNavLink } from 'mdbreact';
import styled from 'styled-components';

export const MDexNavbar = styled(MDBNavbar)`
  background-color: #CD3232;
  color: white;
  padding: 0rem 1rem;

  -webkit-box-shadow: none;
  box-shadow: none;

`;

export const NavbarBrandLink = styled(MDBNavLink)`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  padding-left: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
`;

export const NavLink = styled(MDBNavLink)`
  color: 'white';
  background: none;

  font-weight: 700;
  font-size: x-large;
  font-style: normal;

  :hover {
    color: rgba(255, 255, 255, 0.8);
    --webkit-transition: .35s;
    transition: .35s;
  }
`;
