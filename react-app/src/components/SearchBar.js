import React from 'react';
import { FaSearch } from "react-icons/fa";

import "./searchBar.css";

export const SearchBar = ({setResults}) => {
  const [input, setInput] = React.useState("");

  const fetchData = (value) => {
    fetch("http://localhost:5150/api/demployees")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((employee) => {
          return (
            value &&
            employee &&
            employee.name &&
            employee.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">  
    <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};