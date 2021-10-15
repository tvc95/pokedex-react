/* eslint-disable max-len */
import { MDBBtn } from 'mdbreact';
import React from 'react';
import {
  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from './styles';

interface Props {
  show: boolean;
  setShow: () => void;
}

const ModalAbout: React.FC<Props> = ({ show, setShow }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <h3 className="modal-title">About</h3>
        </ModalHeader>

        <ModalBody>
          <p>This web application was developed by tvc95. Check out my portfolio at the link below:</p>
          <a href="https://tvc95.github.io">Go to my website</a>
          <br />
          <p>All rights reserved to The Pokémon Company International.</p>
        </ModalBody>

        <ModalFooter>
          <MDBBtn color="secondary" onClick={setShow}>Close</MDBBtn>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAbout;
