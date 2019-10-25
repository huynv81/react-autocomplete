import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons/faAtom";
import Autocomplete from "../../src";
import { AUTOCOMPLETE_OPTIONS } from "../constants";

const COMPLEX_AUTOCOMPLETE_OPTIONS = AUTOCOMPLETE_OPTIONS.map(option => ({
  text: option,
  value: option,
  render: o => (
    <p>
      <FontAwesomeIcon icon={faAtom} />
      &nbsp;
      {o.text}
    </p>
  )
}));

export default function ComplexExample() {
  const [visibleOptions, setVisibleOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleChange = useCallback(value => {
    setUserInput(value);
    setIsLoading(true);

    setTimeout(() => {
      const matches = COMPLEX_AUTOCOMPLETE_OPTIONS.filter(s =>
        s.text.toLowerCase().includes(value.toLowerCase())
      );
      setVisibleOptions(matches);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleClearOptions = useCallback(() => {
    setVisibleOptions([]);
    setUserInput("");
  }, []);

  const handleSelectOption = useCallback(({ text }) => {
    setUserInput(text);
  }, []);

  return (
    <Autocomplete
      loading={isLoading}
      onChange={handleChange}
      onClearOptions={handleClearOptions}
      onSelectOption={handleSelectOption}
      options={visibleOptions}
      value={userInput}
    />
  );
}
