/* eslint-disable import/prefer-default-export */
import { MDBCol } from 'mdbreact';
import styled from 'styled-components';

export const PkmnImageSlides = styled(MDBCol)`
  padding: 0 !important;
`;

export const PokemonInfoI = styled(MDBCol)`
  background-color: #f4e2e2;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
  margin-bottom: 0;

  @media (min-width: 992px) {
    border-top-left-radius: 21px;
    border-bottom-left-radius: 21px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-bottom: 2rem;
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
  font-weight: 700;
  font-size: 1.5rem;
  @media (min-width: 768px) {
    font-size: xx-large;
  }
`;

export const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  align-self: flex-end;
  padding-inline-start: 0.8rem;

  @media (max-width: 425px) {
    display: block;
  }

  li {
    display: inline-block;

    & + li {
      margin-left: 8px;
    }

    .is-hidden-false span,
    .egg-gp span {
      background-color: #cd3232;
      border-radius: 52px;
      text-anchor: middle;
      font-size: 1.1rem;
      font-family: Advent Pro;
      font-style: normal;
      font-weight: 600;
      color: white;
      text-transform: capitalize;
      padding: 2px 1rem;
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
      padding: 2px 1rem;
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

    h3 {
      font-weight: 700;
      font-size: 1.6rem; /* mobile */

      @media (min-width: 576px) {
        font-size: 2.2rem;
      }
      @media (min-width: 992px) {
        font-size: 3.5rem;
      }
    }
  }
`;

export const PokemonInfoII = styled(MDBCol)`
  background-color: #f4e2e2;
  border-bottom-left-radius: 21px;
  border-bottom-right-radius: 21px;
  padding-bottom: 2rem;

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

export const EvoChartContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, minmax(104px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(104px, 1fr));

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, minmax(104px, 1fr));
  }
`;

export const PokemonStatsContainer = styled(MDBCol)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const PokemonTypeChart = styled(MDBCol)`
  margin-top: 1.2rem;
  background-color: #f4e2e2;
  padding: 1rem;
  padding-top: 0rem;
  padding-bottom: 1.5rem;

  @media (max-width: 992px) {
    border-top-left-radius: 21px;
    border-bottom-left-radius: 21px;
    border-top-right-radius: 21px;
    border-bottom-right-radius: 21px;
  }
`;
