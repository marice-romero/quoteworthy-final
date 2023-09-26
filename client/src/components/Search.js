import "./Search.css";

const Search = ({
  params,
  setParams,
  setIsSearched,
  searchTerm,
  setSearchTerm,
}) => {
  if (params.search?.length > 0) {
    setIsSearched(true);
  }

  return (
    <div className="search-form">
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
    </div>
  );
};

export default Search;
