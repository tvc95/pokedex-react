/* eslint-disable import/prefer-default-export */
import { MDBNav, MDBTabPane } from 'mdbreact';
import styled from 'styled-components';

export const StyledTabs = styled(MDBNav)`
  .nav-link {
      /* border-color: rgba(255,255,255,.3); */
      background-color: rgba(42,44,45,.4);
      border-radius: 0px;
      border-bottom: 0px;
      color: #fff;
      padding: 0 auto;
      font-weight: 600;
      text-transform: capitalize;
  }

  .tab-content {
      padding-bottom: 2rem !important;
  }
`;

export const PkmnName = styled.h3`
  font-weight: 600;
  text-transform: capitalize;
`;

export const PkmnTabPane = styled(MDBTabPane)`
  background-color: rgba(255, 255, 255, 0.6);
  padding: 1rem;
  border-bottom-left-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;

  .types {
    display: flex;

    h4 {
      text-transform: capitalize;
      font-style: italic;
      font-weight: 500;
      font-size: 1.2rem;
    }
  }
`;
