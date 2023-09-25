import { useState } from "react";
import "./Search.css";

const Search = ({ params, setParams, setIsSearched }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearched(true);
    setSearchTerm("");
  };

  console.log(searchTerm);
  console.log(params);
  return (
    <div className="search-form">
      {" "}
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="find quote by keyword, source"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setParams({ ...params, page: 1, search: e.target.value });
          }}
        ></input>
        <button type="submit">search</button>
      </form>
    </div>
  );
};

export default Search;
