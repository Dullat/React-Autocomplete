import React from "react";

const SuggestionList = ({
  suggestions = [],
  inputValue,
  onSuggestionClick,
  setSelected,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index} className="text-blue-600">
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  const handleClick = (value) => {
    onSuggestionClick(value);
    setSelected(true);
  };
  return (
    <React.Fragment>
      <div className="border-2 border-slate-400 max-h-52 overflow-auto">
        {suggestions.map((suggestion, index) => {
          const currSuggestion = suggestion.name;
          return (
            <li
              key={index}
              className="cursor-pointer list-none p-1 px-2 bg-slate-300 border-b-2"
              id={`suggestion-${index}`}
              onClick={() => handleClick(currSuggestion)}
            >
              {getHighlightedText(currSuggestion, inputValue)}
            </li>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default SuggestionList;
