import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const AutoComplete = ({ fetchSuggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  console.log(suggestions);

  const handleChange = (e) => {
    setInputValue(e.target.value);
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
    if (inputValue.length > 1) {
      debounceGetSuggestions(inputValue);
    }
  }, [inputValue]);

  const debounceGetSuggestions = useCallback(debounce(getSuggestions, 600), []);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="border-black border-solid border-2"
      />
      {(loading || error || suggestions.length > 0) && (
        <ul>
          {error && <div>{error}</div>}
          {loading && <div>Loading...</div>}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
