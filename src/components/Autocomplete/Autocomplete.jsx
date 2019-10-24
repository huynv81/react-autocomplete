import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./Autocomplete.css";

export default function Autocomplete({ suggestions, value }) {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value);
  const input = useRef();

  // Event fired when the input value is changed
  const handleChange = useCallback(
    e => {
      const { value } = e.currentTarget;

      const valueMatches = suggestions.filter(
        s => s.toLowerCase().indexOf(value.toLowerCase()) > -1
      );

      setActiveSuggestionIndex(0);
      setFilteredSuggestions(valueMatches);
      setShouldShowSuggestions(true);
      setUserInput(value);
    },
    [suggestions]
  );

  const handleClick = useCallback(e => {
    setActiveSuggestionIndex(0);
    setFilteredSuggestions([]);
    setShouldShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
    input.current.value = e.currentTarget.innerText;
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "Enter") {
        setActiveSuggestionIndex(0);
        setShouldShowSuggestions(false);
        input.current.value = filteredSuggestions[activeSuggestionIndex];
      } else if (e.key === "ArrowUp") {
        if (activeSuggestionIndex === 0) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      } else if (e.key === "ArrowDown") {
        if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
          return;
        }
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    },
    [filteredSuggestions, activeSuggestionIndex]
  );

  return (
    <React.Fragment>
      <input
        type="text"
        className="autoComplete"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        defaultValue={userInput}
        ref={input}
      />
      {shouldShowSuggestions && !!userInput && (
        <React.Fragment>
          {!!filteredSuggestions.length ? (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  className={
                    index === activeSuggestionIndex ? "suggestion-active" : ""
                  }
                  key={suggestion}
                  onClick={handleClick}
                >
                  {suggestion}
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
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.shape(), PropTypes.string, PropTypes.number])
  ),
  value: PropTypes.string
};

Autocomplete.defaultProps = {
  suggestions: [
    "Alligator",
    "Bask",
    "Crocodilian",
    "Death Roll",
    "Eggs",
    "Jaws",
    "Reptile",
    "Solitary",
    "Tail",
    "Wetlands"
  ],
  value: undefined
};
