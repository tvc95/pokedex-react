/* eslint-disable import/prefer-default-export */
import { MDBTable } from 'mdbreact';
import styled from 'styled-components';

export const Tr = styled.tr`
  th,
  td {
    font-weight: 600;
    text-transform: capitalize;
  }
`;

export const Text = styled.p`
  font-weight: 600;
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1rem;
`;

export const MDBTableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -0.5rem; /* compensa padding do container */
  padding: 0 0.5rem;
`;
