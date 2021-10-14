/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer,
} from
  'mdbreact';
import axios from 'axios';
import {
  Carousel, Description, PkmnArt, PkmnArtCaption,
} from './styles';

interface Ability {
  ability: {
    name: string;
  }
  is_hidden: boolean;
}

interface PokemonVariety {
  abilities: Array<Ability>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  name: string;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    }
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
}

interface Props {
  pkmnId: number;
  pkmnVarieties: Array<PokemonVariety>;
}

// https://archives.bulbagarden.net/wiki/Category:Ken_Sugimori_Pok%C3%A9mon_artwork

const PkmnArtCarousel: React.FC<Props> = ({ pkmnId, pkmnVarieties }: Props) => {
  /// State hooks
  const [pkmnArtwork, setPkmnArtwork] = useState<string[]>([]);

  const fetchImages = async () => {
    const mapImages = pkmnVarieties.map(async (variety) => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${variety.name}`);

      return response.data.sprites.other['official-artwork'].front_default;
    });

    const images = await Promise.all(mapImages);

    setPkmnArtwork(images);
  };

  useEffect(() => {
    async function execute() {
      await fetchImages();
    }

    execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Carousel
        activeItem={1}
        length={pkmnArtwork.length}
        showControls
        showIndicators
      >
        <MDBCarouselInner>
          {pkmnArtwork.map((image, idx) => (
            <MDBCarouselItem itemId={`${idx + 1}`} key={pkmnVarieties[idx].name}>
              <MDBView>
                <PkmnArt
                  src={image}
                  alt={pkmnVarieties[idx].name}
                />
              </MDBView>
              <PkmnArtCaption>
                <Description>{pkmnVarieties[idx].name.charAt(0).toUpperCase() + pkmnVarieties[idx].name.slice(1).replace('-', ' ')}</Description>
              </PkmnArtCaption>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </Carousel>
    </>
  );
};

export default PkmnArtCarousel;
