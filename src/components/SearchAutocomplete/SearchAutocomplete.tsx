import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import usePokemonNames from '../../hooks/usePokemonNames';
import {
  AutocompleteWrapper,
  SuggestionsDropdown,
  SuggestionItem,
  SuggestionName,
  SuggestionId,
  HighlightedText,
  LoadingHint,
} from './styles';

/**
 * Highlights the matching portion of a Pokémon name.
 * For example, if name="charizard" and query="char", renders:
 *   <strong style="color:red">char</strong>izard
 */
const highlightMatch = (name: string, query: string) => {
  const lower = name.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());

  if (idx === -1) return <>{name}</>;

  const before = name.slice(0, idx);
  const match = name.slice(idx, idx + query.length);
  const after = name.slice(idx + query.length);

  return (
    <>
      {before}
      <HighlightedText>{match}</HighlightedText>
      {after}
    </>
  );
};

/**
 * Formats a Pokémon ID with leading zeros, e.g. 1 → "#001", 25 → "#025"
 */
const formatId = (id: number) => `#${String(id).padStart(3, '0')}`;

/**
 * Capitalizes the first letter of a name and replaces hyphens with spaces.
 */
const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

interface SearchAutocompleteProps {
  /** Placeholder text for the input */
  placeholder: string;
}

/**
 * A search input with debounced autocomplete suggestions.
 *
 * Features:
 * - Debounced filtering (300ms) so suggestions don't update on every keystroke
 * - Keyboard navigation (ArrowUp/Down to select, Enter to confirm, Escape to close)
 * - Click outside to close the dropdown
 * - Shows Pokémon sprite, name with highlighted match, and dex number
 * - Navigates to the Pokémon detail page or search results page
 */
const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder,
}: SearchAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedQuery = useDebounce(inputValue, 300);
  const { filterByName, loading: namesLoading } = usePokemonNames();

  const history = useHistory();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get filtered suggestions based on the debounced query
  const suggestions = debouncedQuery.length >= 2 ? filterByName(debouncedQuery) : [];

  // Reset active index when suggestions change
  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  /**
   * Navigate to a Pokémon's detail page
   */
  const goToPokemon = useCallback(
    (name: string) => {
      setShowSuggestions(false);
      setInputValue('');
      history.push(`/data/pokemon/${name}`);
    },
    [history],
  );

  /**
   * Navigate to search results page
   */
  const goToSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      setShowSuggestions(false);
      history.push(`/search/${query.trim().toLowerCase()}`);
    },
    [history],
  );

  /**
   * Handle keyboard navigation within the suggestions dropdown
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        goToSearch(inputValue);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;

      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          goToPokemon(suggestions[activeIndex].name);
        } else {
          goToSearch(inputValue);
        }
        break;

      case 'Escape':
        setShowSuggestions(false);
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  /**
   * Close dropdown when clicking outside the component
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current
        && !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AutocompleteWrapper ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          if (inputValue.length >= 2) {
            setShowSuggestions(true);
          }
        }}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          padding: '0.6rem 1rem',
          fontSize: '1.15rem',
          fontFamily: "'Advent Pro', sans-serif",
          fontWeight: 600,
          border: 'none',
          borderRadius:
            showSuggestions && suggestions.length > 0 ? '8px 8px 0 0' : '8px',
          outline: 'none',
          background: 'rgba(255, 255, 255, 0.15)',
          color: '#fff',
          transition: 'border-radius 0.2s ease',
        }}
      />

      {showSuggestions && inputValue.length >= 2 && (
        <SuggestionsDropdown>
          {namesLoading && <LoadingHint>Loading Pokémon names...</LoadingHint>}

          {!namesLoading
            && suggestions.length === 0
            && debouncedQuery.length >= 2 && (
              <LoadingHint>
                No Pokémon found for &quot;
                {debouncedQuery}
                &quot;
              </LoadingHint>
          )}

          {suggestions.map((pokemon, index) => (
            <SuggestionItem
              key={pokemon.id}
              isActive={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => goToPokemon(pokemon.name)}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <SuggestionName>
                {highlightMatch(formatName(pokemon.name), debouncedQuery)}
              </SuggestionName>
              <SuggestionId>{formatId(pokemon.id)}</SuggestionId>
            </SuggestionItem>
          ))}
        </SuggestionsDropdown>
      )}
    </AutocompleteWrapper>
  );
};

export default SearchAutocomplete;
