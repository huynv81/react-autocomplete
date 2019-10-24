import React, { useState, useCallback } from "react";
import Autocomplete from "../Autocomplete";
import { AUTOCOMPLETE_SUGGESTIONS } from "../../constants";

export default function ComplexExample() {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState();

  const handleChange = useCallback(value => {
    // Show loading while fetching suggestions using an API call
    setSuggestions(["Loading..."]);

    // Mock delay of setting API-provided suggestions here
    setTimeout(() => {
      setSuggestions(
        AUTOCOMPLETE_SUGGESTIONS.filter(
          s => s.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    }, 2000);
  }, []);

  const handleClearSuggestions = useCallback(() => {
    setSuggestions([]);
    setSelectedSuggestion(undefined);
  }, []);

  const handleSuggestionSelected = useCallback(
    index => {
      setSelectedSuggestion(suggestions[index]);
    },
    [suggestions]
  );

  const renderComplexSuggestion = useCallback(
    suggestion => <span>{suggestion}</span>,
    []
  );

  return (
    <Autocomplete
      onChange={handleChange}
      onClearSuggestions={handleClearSuggestions}
      onSuggestionSelected={handleSuggestionSelected}
      suggestions={suggestions}
      renderSuggestion={renderComplexSuggestion}
      value={selectedSuggestion}
    />
  );
}
