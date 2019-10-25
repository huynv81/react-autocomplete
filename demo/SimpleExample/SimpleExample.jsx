import React, { useState, useCallback } from "react";
import Autocomplete from "../../src";
import { AUTOCOMPLETE_OPTIONS } from "../constants";

const SIMPLE_AUTOCOMPLETE_OPTIONS = AUTOCOMPLETE_OPTIONS.map(option => ({
  text: option,
  value: option
}));

export default function SimpleExample() {
  const [value, setValue] = useState("");
  const [visibleOptions, setVisibleOptions] = useState();

  const handleChange = useCallback(value => {
    setValue(value);
    setVisibleOptions(
      SIMPLE_AUTOCOMPLETE_OPTIONS.filter(s =>
        s.text.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, []);

  const handleClearOptions = useCallback(() => {
    setValue("");
    setVisibleOptions(SIMPLE_AUTOCOMPLETE_OPTIONS);
  }, []);

  const handleSelectOption = useCallback(option => {
    setValue(option.text);
  }, []);

  return (
    <Autocomplete
      options={visibleOptions}
      onChange={handleChange}
      onClearOptions={handleClearOptions}
      onSelectOption={handleSelectOption}
      value={value}
    />
  );
}
