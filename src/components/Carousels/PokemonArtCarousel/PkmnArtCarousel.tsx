/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBCarouselCaption,
} from
  'mdbreact';
import * as pokemonImages from '../../../misc/PokemonImageLinks';
import { PkmnArt } from './styles';

interface Props {
  length: number;
}

const PkmnArtCarousel: React.FC<Props> = ({ length }: Props) => {
  const hello = '';
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={length}
        showControls
        showIndicators
        className="z-depth-1"
      >
        <MDBCarouselInner>
          {pokemonImages.venusaur.links.baseForms.map((baseForm, idx) => (
            <MDBCarouselItem itemId={`${idx + 1}`} key={idx}>
              <MDBView>
                <PkmnArt
                  src={baseForm.toString()}
                  alt="Base form"
                />
              </MDBView>
              <MDBCarouselCaption>
                <p>
                  [fetch varieties[idx]]
                </p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          ))}
          {pokemonImages.venusaur.links.megas.map((megaForm, idx) => (
            <MDBCarouselItem
              itemId={`${(idx + 1) + (pokemonImages.venusaur.links.baseForms.length)}`}
              key={idx}
            >
              <MDBView>
                <PkmnArt
                  src={megaForm.toString()}
                  alt="Mega Evo"
                />
              </MDBView>
              <MDBCarouselCaption>
                <p>
                  {' '}
                  Fetch varieties[idx +
                  {' '}
                  {pokemonImages.venusaur.links.baseForms.length}
                  ]
                </p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          ))}
          {pokemonImages.venusaur.links.gmax.map((gmax, idx) => (
            <MDBCarouselItem itemId={`${(idx + 1) + (pokemonImages.venusaur.links.baseForms.length) + (pokemonImages.venusaur.links.megas.length)}`} key={idx}>
              <MDBView>
                <PkmnArt
                  src={gmax.toString()}
                  alt="GMAX form"
                />
              </MDBView>
              <MDBCarouselCaption>
                <p>
                  Fetch varieties[idx +
                  {' '}
                  {pokemonImages.venusaur.links.megas.length}
                  ]
                </p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};

export default PkmnArtCarousel;
