import React from 'react';
import {
  MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer,
} from
  'mdbreact';
import * as pokemonImages from '../../../misc/PokemonImageLinks';
import {
  Carousel, Description, PkmnArt, PkmnArtCaption,
} from './styles';

interface Props {
  length: number;
  pkmnName: string;
}

const PkmnArtCarousel: React.FC<Props> = ({ length, pkmnName }: Props) => {
  const hello = '';
  return (
    <MDBContainer>
      <Carousel
        activeItem={1}
        length={length}
        showControls
        showIndicators
      >
        <MDBCarouselInner>
          {pokemonImages.venusaur.links.baseForms.map((baseForm, idx) => (
            <MDBCarouselItem itemId={`${idx + 1}`} key={baseForm.url}>
              <MDBView>
                <PkmnArt
                  src={baseForm.url.toString()}
                  alt="Base form"
                />
              </MDBView>
              <PkmnArtCaption>
                <Description>{baseForm.description}</Description>
              </PkmnArtCaption>
            </MDBCarouselItem>
          ))}
          {pokemonImages.venusaur.links.megas.map((megaForm, idx) => (
            <MDBCarouselItem
              itemId={`${(idx + 1) + (pokemonImages.venusaur.links.baseForms.length)}`}
              key={megaForm.url}
            >
              <MDBView>
                <PkmnArt
                  src={megaForm.url.toString()}
                  alt="Mega Evo"
                />
              </MDBView>
              <PkmnArtCaption>
                <Description>{megaForm.description}</Description>
              </PkmnArtCaption>
            </MDBCarouselItem>
          ))}
          {pokemonImages.venusaur.links.gmax.map((gmaxForm, idx) => (
            <MDBCarouselItem itemId={`${(idx + 1) + (pokemonImages.venusaur.links.baseForms.length) + (pokemonImages.venusaur.links.megas.length)}`} key={gmaxForm.url}>
              <MDBView>
                <PkmnArt
                  src={gmaxForm.url.toString()}
                  alt="GMAX form"
                />
              </MDBView>
              <PkmnArtCaption>
                <Description>{gmaxForm.description}</Description>
              </PkmnArtCaption>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </Carousel>
    </MDBContainer>
  );
};

export default PkmnArtCarousel;
