/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20 !important;
`;

export const ModalContent = styled.div`
  max-width: 400px;
  background-color: #fff;
  border-radius: 0.6rem;
`;

export const ModalHeader = styled.div`
  padding: 1rem;

  h3 {
    font-weight: 600;
    font-size: 2rem;
  }
`;

export const ModalFooter = styled.div`
  padding: 1rem;
`;

export const ModalBody = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  p {
    font-weight: 500;
  }
`;
