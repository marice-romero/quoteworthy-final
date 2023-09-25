import "./Sort.css";

const Sort = ({ params, setParams }) => {
  const handleSort = (e) => {
    setParams({ ...params, sort: e.target.value });
  };

  return (
    <div className="sort-container">
      <label htmlFor="sort">sort:</label>
      <select id="sort" onChange={handleSort}>
        <option value="createdAt">oldest</option>
        <option value="newest">newest</option>
        <option value="quoteText">A-Z by quote</option>
        <option value="source">A-Z by source</option>
      </select>
    </div>
  );
};

export default Sort;
