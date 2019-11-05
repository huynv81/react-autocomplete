# react-autocomplete

React Autocomplete made with hooks

## Setup

```
$ npm i @dhruv-m-patel/react-autocomplete -S
```

## Simple Usage

Import the package using `import Autocomplete from '@dhruv-m-patel/react-autocomplete';`.
Import css using `import '/node_mobules/@dhruv-m-patel/react-autocomplete/dist/ReactAutocomplete.css';`

```jsx
<ReactAutocomplete
  options={[{ text: "option 1", value: 1 }, { text: "option 2", value: 2 }]}
  className="additionalClassYouWantToApply"
  value={1}
  onChange={handleChange} // Provides user types string back to consumer
  onSelectOption={handleSelectOption} // Provides user selected option object back to consumer
  onClearOptions={handleClearOptions} // Indicates no selection made, input needs to be cleared
/>
```

## With JSX options

```jsx
<ReactAutocomplete
  options={[
    { text: "option 1", value: "option 1", render: jsxFn },
    { text: "option 2", value: "option 2", render: jsxFn }
  ]}
  value="option 2"
  onChange={handleChange}
  onSelectOption={handleSelectOption}
  onClearOptions={handleClearOptions}
/>
```

### References:

- Creating a basic react-autocomplete: https://alligator.io/react/react-autocomplete
- Making autocomplete accessible: https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
