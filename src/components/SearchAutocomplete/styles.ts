import styled from 'styled-components';

export const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SuggestionsDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 320px;
  overflow-y: auto;

  @media (max-width: 568px) {
    max-height: 50vh;
  }
`;

export const SuggestionItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: "Advent Pro", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #3a3a3a;
  transition: background 0.15s ease;
  background: ${(props) => (props.isActive ? '#f0f0f0' : 'transparent')};

  &:hover {
    background: #f0f0f0;
  }

  img {
    width: 40px;
    height: 40px;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    object-fit: contain;
  }
`;

export const SuggestionName = styled.span`
  flex: 1;
  text-transform: capitalize;
`;

export const SuggestionId = styled.span`
  color: #999;
  font-size: 0.9rem;
  font-weight: 400;
`;

export const HighlightedText = styled.strong`
  color: #cd3232;
`;

export const LoadingHint = styled.li`
  padding: 0.75rem 1rem;
  color: #999;
  font-family: "Advent Pro", sans-serif;
  font-size: 1rem;
  text-align: center;
`;
