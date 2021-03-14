/* eslint-disable import/prefer-default-export */
import { MDBCol } from 'mdbreact';
import styled from 'styled-components';

export const PkmnImageSlides = styled(MDBCol)`
  padding: 0 !important;
`;

export const PokemonInfoI = styled(MDBCol)`
  background-color: #F4E2E2;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
  margin-bottom: 2rem;

  @media (min-width: 992px) {
    border-top-left-radius: 21px;
    border-bottom-left-radius: 21px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  #description {
    margin-top: 1.3rem;

    p {
      text-align: justify;
      font-style: normal;
      font-size: large;
      font-weight: 500;
    }

    p small em {
      font-weight: 600;
    }
  }
`;

export const SubTitle = styled.h3`
  margin-top: 1.5rem;
  font-family: Advent Pro;
  font-size: xx-large;
  font-weight: 700;
`;

export const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  align-self: flex-end;
  padding-inline-start: 0.8rem;

  li {
    display: inline-block;

    & + li {
      margin-left: 8px;
    }

    .is-hidden-false span,
    .egg-gp span {
      background-color: #CD3232;
      border-radius: 52px;
      text-anchor: middle;
      font-size: 1.1rem;
      font-family: Advent Pro;
      font-style: normal;
      font-weight: 600;
      color: white;
      text-transform: capitalize;
      padding: 0rem 1rem;
    }

    .is-hidden-true span {
      background-color: mediumpurple;
      border-radius: 52px;
      text-anchor: middle;
      font-size: 1.1rem;
      font-family: Advent Pro;
      font-style: normal;
      font-weight: 600;
      color: white;
      text-transform: capitalize;
      padding: 0rem 1rem;
    }

    .is-hidden-true em {
      margin: 0 0.2rem;
    }
  }

`;

export const PkmnPhysicalInfo = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  #height,
  #weight,
  #catch-rate {
    text-anchor: middle;
    text-align: center;
    font-family: Advent Pro;
    font-style: normal;
    color: black;

    h2 {
      font-weight: 600;
      font-size: 1.4rem;

      @media (min-width: 992px) {
        font-size: 2rem;
      }
    }

    h3{
      font-weight: 700;
      font-size: 2.2rem;

      @media (min-width: 992px) {
        font-size: 3.5rem;
      }
    }
  }
`;

export const PokemonInfoII = styled(MDBCol)`
  background-color: #F4E2E2;
  border-bottom-left-radius: 21px;
  border-bottom-right-radius: 21px;
  margin-bottom: 2rem;

  @media (min-width: 992px) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
  }

  #description {
    margin-top: 1.3rem;

    p {
      text-align: justify;
      font-style: normal;
      font-size: large;
      font-weight: 500;
    }

    p small em {
      font-weight: 600;
    }
  }

  #hatching-time {
    display: flex;
    justify-content: flex-start;

    p {
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      align-self: flex-end;
      padding-inline-start: 0.8rem;
      font-size: large;
      font-weight: 500;
    }
  }

  #leveling-rate {
    
  }
`;
