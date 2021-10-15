/* eslint-disable import/prefer-default-export */
import { MDBContainer } from 'mdbreact';
import styled from 'styled-components';

export const PokemonHeaderContainer = styled(MDBContainer)`
    background: #A81818;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    padding-left: 0;
    padding-right: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const PkmnPrimaryInfo = styled.div`
    background-color: #CD3232;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    padding: 1rem 20px 1rem 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    display: flex;
    justify-content: space-between;

    font-family: Advent Pro;
    font-style: normal;
    color: white;
`;

export const PkmnName = styled.h1`
  font-weight: 700;

  font-size: 2.1rem; /*Mobile*/
  align-self: flex-start;
  text-transform: capitalize;

  @media (min-width: 1200px) {
    font-size: 4.5rem;
  }
`;

export const PkmnNumber = styled.h4`
  font-weight: 700;

  font-size: 1.3rem; /*Mobile*/
  align-self: flex-end;

  @media (min-width: 1200px) {
    font-size: 3rem;
  }
`;

export const PkmnSecondaryInfo = styled.div`
  align-items: center;

  display: flex;
  justify-content: space-between;
  font-family: Advent Pro;
  font-style: normal;
  color: white;

  padding-top: 0.8rem;
  padding-left: 25px;
  padding-right: 20px;
  font-weight: 700;
`;

export const PkmnSpecies = styled.h3`
  font-size: x-large;
  font-weight: 700;

  @media (min-width: 577px) {
    font-size: xx-large;
  }
`;

export const PkmnTypesUL = styled.ul`
  padding: 0;
  font-size: 1.75rem;
  margin-top: 0;
  margin-bottom: 0.5rem;

  li {
    display: inline;
    padding-left: 0.5rem;
  }

  li a img {
    width: 2.7rem;
  }
`;

// export const PkmnTypesLI = styled.li`
//   display: inline;
//   padding-left: 0.5rem;
// `;
