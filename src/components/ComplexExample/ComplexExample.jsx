import React, { useState, useCallback } from "react";
import Autocomplete from "../Autocomplete";
import { AUTOCOMPLETE_SUGGESTIONS } from "../../constants";

const COMPLEX_SUGGESTIONS = AUTOCOMPLETE_SUGGESTIONS.map(s => ({
  name: s
}));

const LOADING_TEXT = "Loading...";

export default function ComplexExample() {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState();

  const handleChange = useCallback(value => {
    // Show loading while fetching suggestions using an API call
    setFilteredSuggestions([LOADING_TEXT]);

    // Mock delay of setting API-provided suggestions here
    setTimeout(() => {
      const matches = COMPLEX_SUGGESTIONS.filter(
        s => s.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setFilteredSuggestions(matches);
    }, 2000);
  }, []);

  const handleClearSuggestions = useCallback(() => {
    setFilteredSuggestions([]);
    setSelectedSuggestion(undefined);
  }, []);

  const handleSuggestionSelected = useCallback(
    index => {
      if (filteredSuggestions[index] !== LOADING_TEXT) {
        setSelectedSuggestion(filteredSuggestions[index]);
      }
    },
    [filteredSuggestions]
  );

  const renderComplexSuggestion = useCallback(
    suggestion => <span>{suggestion.name}</span>,
    []
  );

  return (
    <Autocomplete
      onChange={handleChange}
      onClearSuggestions={handleClearSuggestions}
      onSuggestionSelected={handleSuggestionSelected}
      suggestions={filteredSuggestions}
      renderSuggestion={renderComplexSuggestion}
      value={selectedSuggestion ? selectedSuggestion.name : ""}
    />
  );
}
