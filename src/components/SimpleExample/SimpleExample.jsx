import React, { useState, useCallback } from "react";
import Autocomplete from "../Autocomplete";
import { AUTOCOMPLETE_SUGGESTIONS } from "../../constants";

export default function SimpleExample() {
  const [value, setValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    AUTOCOMPLETE_SUGGESTIONS
  );

  const handleChange = useCallback(value => {
    setValue(value);
    setFilteredSuggestions(
      AUTOCOMPLETE_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, []);

  const handleClearSuggestions = useCallback(() => {
    setValue("");
    setFilteredSuggestions(AUTOCOMPLETE_SUGGESTIONS);
  }, []);

  const handleSuggestionSelected = useCallback(
    index => {
      setValue(filteredSuggestions[index]);
    },
    [filteredSuggestions]
  );

  return (
    <Autocomplete
      suggestions={filteredSuggestions}
      onChange={handleChange}
      onClearSuggestions={handleClearSuggestions}
      onSuggestionSelected={handleSuggestionSelected}
      value={value}
    />
  );
}
