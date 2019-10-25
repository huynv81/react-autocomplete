import React from "react";
import SimpleExample from "../SimpleExample";
import ComplexExample from "../ComplexExample";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>React Autocomplete</h1>
      <h2>Start typing and experience the autocomplete wizardry!</h2>

      <p>&nbsp;</p>
      <h4>Simple Autocomplete Example</h4>
      <SimpleExample />

      <p>&nbsp;</p>
      <h4>Autocomplete with custom suggestions</h4>
      <ComplexExample />
    </div>
  );
}
