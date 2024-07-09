import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import SuggestionList from "./SuggestionList";

const AutoComplete = ({ fetchSuggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [selected, setSelected] = useState(false);
  const suggestionInput = useRef();
  const outerBox = useRef();
  console.log(suggestions);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (outerBox.current && !outerBox.current.contains(e.target)) {
      setSelected(true);
    }
  };

  const onSuggestionClick = (clickedSuggestion) => {
    setInputValue(clickedSuggestion);
    setSelected(true);
  };

  const getSuggestions = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSuggestions(query);
      setSuggestions(result);
    } catch (error) {
      setError("Error: " + error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length > 1 && !selected) {
      debounceGetSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  const debounceGetSuggestions = useCallback(debounce(getSuggestions, 600), []);

  return (
    <div ref={outerBox} className="">
      <input
        type="text"
        ref={suggestionInput}
        value={inputValue}
        onChange={handleChange}
        className="border-black border-solid border-2 rounded-md block w-80 p-1 px-2"
        placeholder="Enter value"
        onFocus={() => setSelected(false)}
      />
      {(loading || error || (suggestions.length > 0 && !selected)) && (
        <>
          <ul>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
          </ul>
          <SuggestionList
            suggestions={suggestions}
            inputValue={inputValue}
            onSuggestionClick={onSuggestionClick}
            setSelected={setSelected}
          />
        </>
      )}
    </div>
  );
};

export default AutoComplete;
