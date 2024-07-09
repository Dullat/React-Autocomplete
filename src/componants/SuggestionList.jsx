import React from "react";

const SuggestionList = ({ suggestions = [] }) => {
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
            {currSuggestion}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionList;
