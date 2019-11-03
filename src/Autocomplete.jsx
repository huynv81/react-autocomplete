import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Autocomplete.css';

function getRandomId(length = 8) {
  const input = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
  let randomId = '';
  for (var i = 0; i < length; i++) {
    randomId += input[Math.floor(Math.random() * input.length)];
  }
  return randomId;
}

/** The regular HTML input extended to support autocomplete options displayed as user types */
export default function Autocomplete({
  options,
  value,
  onChange,
  onSelectOption,
  onClearOptions,
  loading,
  loadingIcon,
  ...rest
}) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [shouldShowDropdownOptions, setShouldShowDropdownOptions] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(options);

  const inputInstance = useRef();

  const handleChange = useCallback(
    e => {
      const { value: inputValue } = e.target;
      inputInstance.current.value = inputValue;
      setSelectedOptionIndex(0);
      setVisibleOptions(options.filter(o => o.text.toLowerCase().includes(inputValue.toLowerCase())));
      setShouldShowDropdownOptions(!!options.length);
      if (inputValue) {
        onChange(inputValue);
      } else {
        onClearOptions();
      }
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

  // Keyboard events support
  const handleKeyDown = useCallback(
    e => {
      if (['Enter', 'ArrowUp', 'ArrowDown', 'Esc'].includes(e.key)) {
        if (e.key === 'Enter') {
          // Enter key pressed: An option was selected by user using keyboard
          setShouldShowDropdownOptions(false);
          onSelectOption(options[selectedOptionIndex]);
          inputInstance.current.value = options[selectedOptionIndex].text;
          setSelectedOptionIndex(0);
        } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
          // if Up arrow key is pressed and already no options were selected
          // or Down arrow was clicked and last option was selected then return
          if (
            (e.key === 'ArrowUp' && selectedOptionIndex === 0) ||
            (e.key === 'ArrowDown' &&
              selectedOptionIndex - 1 === options.length)
          ) {
            return;
          }

          // Select appropriate autocomplete option depending on which arrow key was used
          const targetIndex =
            e.key === 'ArrowUp'
              ? selectedOptionIndex - 1
              : selectedOptionIndex + 1;
          setSelectedOptionIndex(targetIndex);

          // focus the element
          const targetOption = document.getElementById(
            `autocompleteOption${targetIndex}`
          );
          if (targetOption) {
            targetOption.focus();
          }
        } else {
          // ESC key was pressed
          onClearOptions();
        }
      }
    },
    [options, selectedOptionIndex, onSelectOption, onClearOptions]
  );

  // If in loading state, reset selection option index
  useEffect(() => {
    if (loading) {
      setSelectedOptionIndex(0);
    }
  }, [loading]);

  // when dropdown options are received, determine if autocomplete options can be shown or not
  useEffect(() => {
    setShouldShowDropdownOptions(options.length);
    setVisibleOptions(options);
  }, [options]);

  // Set input value when the value received by the component changes
  useEffect(() => {
    if (inputInstance && inputInstance.current) {
      inputInstance.current.value = value;
    }

    if (value) {
      setVisibleOptions(options.filter(o => o.text.toLowerCase().includes(value.toLowerCase())));
    }
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
        className={`dropdownOptions ${shouldShowDropdownOptions ? 'open' : ''}`}
      >
        {loading ? (
          <ul className="options" role="listbox">
            <li role="option" aria-selected={false}>
              {loadingIcon}
            </li>
          </ul>
        ) : (
          !!visibleOptions.length &&
          !!(inputInstance && inputInstance.current && inputInstance.current.value) && (
            <ul className="options" role="listbox">
              {visibleOptions.map((option, index) => (
                <React.Fragment key={option.value || getRandomId()}>
                  <li
                    id={`autocompleteOption${index}`}
                    className={`option ${
                      index === selectedOptionIndex ? 'selected' : ''
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
  /** Options to display as autocomplete dropdown suggestions */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      render: PropTypes.func
    })
  ),
  /** Indicates the data is being fetched when autocomplete options need to come from API call */
  loading: PropTypes.bool,
  /** Loading icon to show, takes a string or jsx */
  loadingIcon: PropTypes.node,
  /** Value to set in input */
  value: PropTypes.string,
  /** Callback that should be invoked as soon as input value changes */
  onChange: PropTypes.func,
  /** Callback that should be invoked when one of the autocomplete dropdown option is chosen */
  onSelectOption: PropTypes.func,
  /** Callback that should be invoked when ESC key is clicked while displaying autocomplete suggestions */
  onClearOptions: PropTypes.func
};

Autocomplete.defaultProps = {
  options: [],
  loading: false,
  loadingIcon: 'Loading...',
  value: undefined,
  onChange: () => {},
  onSelectOption: () => {},
  onClearOptions: () => {}
};
