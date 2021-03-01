/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { MDBNavbar, MDBNavLink } from 'mdbreact';

export const Navbar = styled(MDBNavbar)`
  background: rgba(255, 68, 68, 1);
  padding: .1rem 1rem;
  box-shadow: none;
`;

export const NavbarBrand = styled.strong`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const NavLink = styled(MDBNavLink)`
  font-size: 1.2rem;
  font-weight: 500;

  :hover {
    background: rgba(222, 68, 68, 1);
  }
`;
