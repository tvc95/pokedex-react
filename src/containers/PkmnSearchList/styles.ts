/* eslint-disable import/prefer-default-export */
import { MDBBtnGroup, MDBContainer } from 'mdbreact';
import styled from 'styled-components';

export const NationalDexContainer = styled(MDBContainer)`
  padding-top: 2rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  justify-items: stretch;
  align-items: stretch;
  justify-content: space-evenly;
`;

export const BtnGroup = styled(MDBBtnGroup)`
  margin-top: 2rem;
`;
