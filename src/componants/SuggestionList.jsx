import React from "react";

const SuggestionList = ({ suggestions = [], inputValue }) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    parts.map((part, index) => {
      return;
    });
  };
  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = suggestion.name;
        return (
          <li
            key={index}
            className="suggestion-item"
            id={`suggestion-${index}`}
          >
            {getHighlightedText(currSuggestion, inputValue)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionList;
