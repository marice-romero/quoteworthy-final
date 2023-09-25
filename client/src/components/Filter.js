import "./Filter.css";

const filterOptions = [
  "movie",
  "TV show",
  "book",
  "video game",
  "poem",
  "other",
];
const Filter = ({ params, setParams, setIsFiltered }) => {
  const handleFilter = (e) => {
    setParams({ ...params, sourceType: e.target.value });
    setIsFiltered(true);
  };

  return (
    <div className="filter">
      <label htmlFor="filter">filter by: </label>
      <select name="filter" id="filter" onChange={handleFilter}>
        {filterOptions.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
