import { MDBContainer } from 'mdbreact';
import React from 'react';
import DexNavbar from '../../components/Navbars/DexNavbar/DexNavbar';
import PokemonHeader from '../../containers/PokemonHeader/PokemonHeader';

const DexData: React.FC = () => (
  <div>
    <DexNavbar />
    <PokemonHeader />
    <MDBContainer fluid style={{ marginTop: '1rem' }}>
      <h1>Dex data</h1>

    </MDBContainer>
  </div>
);

export default DexData;
