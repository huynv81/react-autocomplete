# react-autocomplete

React Autocomplete made with hooks

### Simple Usage

```jsx
<Autocomplete
  options={[{ text: "option 1", value: 1 }, { text: "option 2", value: 2 }]}
  value={1}
  onChange={handleChange} // Provides user types string back to consumer
  onSelectOption={handleSelectOption} // Provides user selected option object back to consumer
  onClearOptions={handleClearOptions} // Indicates no selection made, input needs to be cleared
/>
```

### With JSX options

```jsx
<Autocomplete
  options={[
    { text: "option 1", value: 1, render: jsxFn },
    { text: "option 2", value: 2, render: jsxFn }
  ]}
  value={1}
  onChange={handleChange} // Provides user types string back to consumer
  onSelectOption={handleSelectOption} // Provides user selected option object back to consumer
  onClearOptions={handleClearOptions} // Indicates no selection made, input needs to be cleared
/>
```

References:

- Creating a basic react-autocomplete: https://alligator.io/react/react-autocomplete
- Making autocomplete accessible: https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
