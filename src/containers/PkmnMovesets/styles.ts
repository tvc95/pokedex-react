/* eslint-disable import/prefer-default-export */
import { MDBNav } from 'mdbreact';
import styled from 'styled-components';

export const StyledTabs = styled(MDBNav)`
  .nav-link {
    /* border-color: rgba(255,255,255,.3); */
    background-color: rgba(42,44,45,.6);
    border-radius: 0px;
    border-bottom: 0px;
    color: #fff;
    padding: 0 auto;
    font-weight: 600;
  }

  .tab-content {
    padding-bottom: 2rem !important;
  }
`;
