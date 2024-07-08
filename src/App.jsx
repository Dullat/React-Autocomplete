import { useState } from "react";
import AutoComplete from "./componants/AutoComplete";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  return (
    <>
      <h1>Welcome bruh</h1>
      <AutoComplete fetchSuggestions={fetchSuggestions} />
    </>
  );
}

export default App;
