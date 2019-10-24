import React from "react";
import Autocomplete from "../Autocomplete";
import { AUTOCOMPLETE_SUGGESTIONS } from "../../constants";

export default function SimpleExample() {
  return <Autocomplete suggestions={AUTOCOMPLETE_SUGGESTIONS} />;
}
