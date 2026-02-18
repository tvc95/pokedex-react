import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../../components/Navbars/HomeNavbar/HomeNavbar';
import {
  Body,
  Container,
  ErrorCode,
  Title,
  Message,
  HomeButton,
  SpriteImage,
} from './styles';

/**
 * 404 page shown when no route matches the current URL.
 * Features a MissingNo.-inspired theme (the famous glitch Pokémon)
 * and a clear path back to the homepage.
 */
const NotFound: React.FC = () => (
  <div>
    <Body />
    <HomeNavbar />
    <Container>
      <SpriteImage
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
        alt="Unknown Pokémon"
        onError={(e) => {
          // If the sprite fails to load, hide it gracefully
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <ErrorCode>404</ErrorCode>
      <Title>This route is uncharted territory!</Title>
      <Message>
        Looks like you wandered into the tall grass without a map. The page
        you&apos;re looking for doesn&apos;t exist or may have been moved.
      </Message>
      <Link to="/">
        <HomeButton color="red darken-1">Return to the Pokédex</HomeButton>
      </Link>
    </Container>
  </div>
);

export default NotFound;
