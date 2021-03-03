/* eslint-disable import/prefer-default-export */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PokemonBtnLink = styled(Link)`
    border-radius: 8px;
    background-color: #E55858;
    border: 2px solid #A81818;
    font-family: Advent Pro;
    font-style: normal;
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    text-align: center;
    transition: all 0.2s linear;

    :hover {
      background-color: #FF8B8B;
      color: white;
    }
`;

export const PokemonIcon = styled.img`
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    width: 68px;
    height: 56px;
    object-fit: cover;
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: middle;

    ::hover {
      color: white;
      text-decoration: none;
    }
`;
