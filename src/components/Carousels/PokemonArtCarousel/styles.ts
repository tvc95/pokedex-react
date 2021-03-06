/* eslint-disable import/prefer-default-export */
import {
  MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem,
} from 'mdbreact';
import styled from 'styled-components';

export const Carousel = styled(MDBCarousel)`
  box-shadow: none !important;
  
  .carousel-indicators li{
    background-color: #A81818;
  }

  .carousel-control-next-icon,
  .carousel-control-prev-icon {
      background-size: 100%, 100%;
      border-radius: 50%;
      background-image: none;
      outline: #A81818;

      @media (min-width: 1200px){
        height: 100px;
        width: 100px;
      }
  }

  .carousel-control-next-icon:after
  {
    content: '>';
    font-size: 55px;
    color: #CD3232;
  }

  .carousel-control-prev-icon:after {
    content: '<';
    font-size: 55px;
    color: #CD3232;
  }

  /* Disable transitions for if reduced motion is enabled: */
  @media (prefers-reduced-motion:reduce) {
    .carousel-fade .active.carousel-item-left,
    .carousel-fade .active.carousel-item-right {
        transition: none;
    }
  }
`;

export const PkmnArt = styled.img`
  width: 16rem;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  filter: drop-shadow(2px 6px 4px rgba(0, 0, 0, 0.30));

  vertical-align: middle;
  border-style: none;

  @media(min-width: 577px) and (max-width: 767px) {
    width: 25rem;
  }

  @media(min-width: 768px) and (max-width: 1199px) {
    width: 27rem;
  }

  @media (min-width: 1200px){
    width: 33rem;
  }
`;

export const PkmnArtCaption = styled(MDBCarouselCaption)`
  font-size: 0.8rem;
  font-weight: 800;
  color: #A81818;

  -webkit-text-stroke: 1px black;
  -moz-text-stroke: 1px black;
  -ms-text-stroke: 1px black;

  @media (min-width: 1200px){
    font-size: 1.4rem;
  }
`;

export const Description = styled.p`
  display: inline;
  background-color: rgba(255, 255, 255, 0.5);
  padding-left: 1rem;
  padding-right: 1rem;
`;
