/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  MDBCarouselInner, MDBCarouselItem, MDBView,
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
  pkmnName: string;
  pkmnVarieties: Array<PokemonVariety>;
}

interface ImageData {
  pokemonName: string;
  imageUrl: string;
}

const PkmnArtCarousel: React.FC<Props> = ({ pkmnName, pkmnVarieties }: Props) => {
  /// State hooks
  const [pkmnArtwork, setPkmnArtwork] = useState<ImageData[]>([]);

  /**
   * Fetches sugimori art from each Pokémon variety
   */
  const fetchImages = async () => {
    const mapImages = pkmnVarieties.map(async (variety) => {
      if (variety.name.includes('-totem') || variety.name.includes('-cosplay')) {
        return {
          pokemonName: 'notavailable',
          imageUrl: 'notavailable',
        };
      }

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${variety.name}`);

      return {
        pokemonName: variety.name,
        imageUrl: response.data.sprites.other['official-artwork'].front_default,
      };
    });

    const images = await Promise.all(mapImages);

    if (pkmnName.includes('alola') || pkmnName.includes('galar')) {
      const switchImg = images.splice(1, 1);
      images.unshift(switchImg[0]);
    }

    setPkmnArtwork(images.filter((image) => image.imageUrl !== 'notavailable'));
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
            <MDBCarouselItem itemId={`${idx + 1}`} key={image.pokemonName}>
              <MDBView>
                <PkmnArt
                  src={image.imageUrl}
                  alt={image.pokemonName}
                />
              </MDBView>

              <PkmnArtCaption>
                <Description>{image.pokemonName.charAt(0).toUpperCase() + image.pokemonName.slice(1).replace('-', ' ')}</Description>
              </PkmnArtCaption>
            </MDBCarouselItem>
          ))}
        </MDBCarouselInner>
      </Carousel>
    </>
  );
};

export default PkmnArtCarousel;
