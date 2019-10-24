import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { getRandomId } from "../../utils";
import "./Autocomplete.css";

export default function Autocomplete({
  suggestions,
  renderSuggestion,
  value,
  onChange,
  onSuggestionSelected,
  onClearSuggestions
}) {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);

  const input = useRef();

  useEffect(() => {
    input.current.value = value;
  }, [value]);

  const handleChange = useCallback(
    e => {
      const { value: userInput } = e.currentTarget;
      input.current.value = userInput;
      setActiveSuggestionIndex(0);
      setShouldShowSuggestions(!!suggestions && !!suggestions.length);
      if (userInput) {
        onChange(userInput);
      } else {
        onClearSuggestions();
      }
    },
    [onClearSuggestions, onChange, suggestions]
  );

  const handleClick = useCallback(
    e => {
      setShouldShowSuggestions(false);
      onSuggestionSelected(activeSuggestionIndex);
      setActiveSuggestionIndex(0);
    },
    [onSuggestionSelected, activeSuggestionIndex]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "Enter") {
        onSuggestionSelected(activeSuggestionIndex);
        setActiveSuggestionIndex(0);
        setShouldShowSuggestions(false);
      } else if (e.key === "ArrowUp") {
        if (activeSuggestionIndex === 0) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      } else if (e.key === "ArrowDown") {
        if (activeSuggestionIndex - 1 === suggestions.length) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    },
    [suggestions, activeSuggestionIndex, onSuggestionSelected]
  );

  return (
    <React.Fragment>
      <input
        type="text"
        className="autoComplete"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        defaultValue={value}
        ref={input}
      />
      {shouldShowSuggestions && (
        <React.Fragment>
          {!!suggestions.length ? (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    index === activeSuggestionIndex ? "suggestion-active" : ""
                  }
                  key={getRandomId()}
                  onClick={handleClick}
                >
                  {(renderSuggestion && renderSuggestion(suggestion)) ||
                    suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-suggestions">
              <em>No suggestions to show</em>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Autocomplete.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.node),
  renderSuggestion: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestions: PropTypes.func
};

Autocomplete.defaultProps = {
  suggestions: [],
  renderSuggestion: undefined,
  value: undefined,
  onChange: () => {},
  onSuggestionSelected: () => {},
  onClearSuggestions: () => {}
};
