import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import "./Autocomplete.css";

function getRandomId(length = 8) {
  const input = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
  let randomId = "";
  for (var i = 0; i < length; i++) {
    randomId += input[Math.floor(Math.random() * input.length)];
  }
  return randomId;
}

export default function Autocomplete({
  options,
  value,
  onChange,
  onSelectOption,
  onClearOptions,
  loading,
  ...rest
}) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [shouldShowDropdownOptions, setShouldShowDropdownOptions] = useState(
    false
  );
  const inputInstance = useRef();

  const handleChange = useCallback(
    e => {
      const { value: inputValue } = e.currentTarget;
      if (inputValue) {
        onChange(inputValue);
      } else {
        onClearOptions();
      }
      inputInstance.current.value = inputValue;
      setSelectedOptionIndex(0);
      setShouldShowDropdownOptions(!!options.length);
    },
    [onClearOptions, onChange, options]
  );

  const handleClick = useCallback(
    option => {
      setShouldShowDropdownOptions(false);
      onSelectOption(option);
      inputInstance.current.value = option.text;
      setSelectedOptionIndex(0);
    },
    [onSelectOption]
  );

  const handleKeyDown = useCallback(
    e => {
      if (["Enter", "ArrowUp", "ArrowDown", "Esc"].includes(e.key)) {
        if (e.key === "Enter") {
          setShouldShowDropdownOptions(false);
          onSelectOption(options[selectedOptionIndex]);
          inputInstance.current.value = options[selectedOptionIndex].text;
          setSelectedOptionIndex(0);
        } else if (["ArrowUp", "ArrowDown"].includes(e.key)) {
          if (
            (e.key === "ArrowUp" && selectedOptionIndex === 0) ||
            (e.key === "ArrowDown" &&
              selectedOptionIndex - 1 === options.length)
          ) {
            return;
          }
          const targetIndex =
            e.key === "ArrowUp"
              ? selectedOptionIndex - 1
              : selectedOptionIndex + 1;
          setSelectedOptionIndex(targetIndex);
          const targetOption = document.getElementById(
            `autocompleteOption${targetIndex}`
          );
          if (targetOption) {
            targetOption.focus();
          }
        } else {
          onClearOptions();
        }
      }
    },
    [options, selectedOptionIndex, onSelectOption, onClearOptions]
  );

  useEffect(() => {
    if (loading) {
      setSelectedOptionIndex(0);
    }
  }, [loading]);

  useEffect(() => {
    setShouldShowDropdownOptions(options.length);
  }, [options]);

  useEffect(() => {
    inputInstance.current.value = value;
  }, [value]);

  return (
    <React.Fragment>
      <input
        type="text"
        className="autoComplete"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        defaultValue={value}
        ref={inputInstance}
        {...rest}
      />
      <div
        className={`dropdownOptions ${shouldShowDropdownOptions ? "open" : ""}`}
      >
        {loading ? (
          <ul className="options" role="listbox">
            <li role="option" aria-selected={false}>
              <FontAwesomeIcon
                icon={faSpinner}
                className="fas fa-spinner fa-spin"
              />
            </li>
          </ul>
        ) : (
          !!options.length &&
          !!inputInstance.current.value && (
            <ul className="options" role="listbox">
              {options.map((option, index) => (
                <React.Fragment key={getRandomId()}>
                  <li
                    id={`autocompleteOption${index}`}
                    className={`option ${
                      index === selectedOptionIndex ? "selected" : ""
                    }`}
                    role="option"
                    aria-selected={index === selectedOptionIndex}
                    onKeyDown={handleKeyDown}
                    onClick={() => {
                      handleClick(option);
                    }}
                  >
                    {option.render ? option.render(option) : option.text}
                  </li>
                  {index === options.length && <hr />}
                </React.Fragment>
              ))}
            </ul>
          )
        )}
      </div>
    </React.Fragment>
  );
}

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      render: PropTypes.func
    })
  ),
  loading: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelectOption: PropTypes.func,
  onClearOptions: PropTypes.func
};

Autocomplete.defaultProps = {
  options: [],
  loading: false,
  value: undefined,
  onChange: () => {},
  onSelectOption: () => {},
  onClearOptions: () => {}
};
