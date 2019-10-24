import React, { useState, useCallback, useEffect } from "react";
import Autocomplete from "../Autocomplete";
import { AUTOCOMPLETE_SUGGESTIONS } from "../../constants";

const COMPLEX_SUGGESTIONS = AUTOCOMPLETE_SUGGESTIONS.map(s => ({
  name: s
}));

const LOADING_TEXT = "Loading...";

export default function ComplexExample() {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState();
  const [mockApiCall, setMockApiCall] = useState();

  const handleChange = useCallback(value => {
    // Show loading while fetching suggestions using an API call
    setFilteredSuggestions([LOADING_TEXT]);

    // Mock delay of setting API-provided suggestions here
    setMockApiCall(() => {
      const matches = COMPLEX_SUGGESTIONS.filter(s =>
        s.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
    });
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

  useEffect(() => {
    const apiCallTimer = setTimeout(mockApiCall, 500);
    return () => clearTimeout(apiCallTimer);
  }, [mockApiCall]);

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
