/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const TypeGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(55px, 1fr));
  align-items: center;

  @media (min-width: 1200px) {
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

export const TypeContainer = styled.div`
  cursor: pointer;
  text-align: center;
  transition: all 0.3s linear;

  img {
    width: 55px;
    filter: invert(58%) sepia(14%) saturate(920%) hue-rotate(313deg) brightness(92%) contrast(104%);
    opacity: 0.5;

    &.null {
      filter: invert(100%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(0%) contrast(20%) !important;
      opacity: 0.9;
    }

    &.rs-2 {
      filter: invert(16%) sepia(43%) saturate(6221%) hue-rotate(104deg) brightness(60%) contrast(102%) !important;
      opacity: 0.9;
    }

    &.rs-1 {
      filter: invert(37%) sepia(94%) saturate(514%) hue-rotate(73deg) brightness(70%) contrast(88%) !important;
      opacity: 0.6;
    }

    &.wk-1 {
      filter: invert(26%) sepia(82%) saturate(10000%) hue-rotate(347deg) brightness(81%) contrast(88%);
      opacity: 0.6;
    }
    &.wk-2 {
      filter: invert(82%) sepia(28%) saturate(7063%) hue-rotate(7deg) brightness(102%) contrast(119%);
      opacity: 0.9;
    }

    @media (min-width: 1200px) {
      width: 70px;
    }
  }

  span {
    font-weight: 600;
  }
`;
