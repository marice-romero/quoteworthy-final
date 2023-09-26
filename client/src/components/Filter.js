import "./Filter.css";

// const filterOptions = [
//   "favorite",
//   "movie",
//   "TV show",
//   "book",
//   "video game",
//   "poem",
//   "other",
// ];
const Filter = ({
  params,
  setParams,
  setIsFiltered,
  checkList,
  setCheckList,
  sourceTypesChecked,
  setSourceTypesChecked,
}) => {
  const handleFilter = ({ currentTarget: input }) => {
    let selection = input.name;

    if (input.checked) {
      const index = checkList.findIndex((list) => list.option === selection);
      checkList[index].checked = true;
      setCheckList([...checkList]);
      setIsFiltered(true);

      if (selection === "favorite") {
        setParams({ ...params, page: 1, favorite: "true" });
      } else {
        // setParams({ ...params, page: 1, sourceType: sourceTypesChecked });
        setSourceTypesChecked([...sourceTypesChecked, selection]);
      }
    }

    if (!input.checked) {
      const index = checkList.findIndex((list) => list.option === selection);
      checkList[index].checked = false;
      setCheckList([...checkList]);

      if (selection === "favorite") {
        delete params.favorite;
        setParams({ ...params, page: 1 });
      } else {
        let newFilterSourceTypes = sourceTypesChecked.filter(
          (sourceType) => sourceType !== selection
        );
        setSourceTypesChecked(newFilterSourceTypes);
      }
    }

    if (checkList.every((selection) => !selection.checked)) {
      setIsFiltered(false);
    }
  };

  return (
    <div className="filter">
      <p htmlFor="filter">filter by: </p>
      <div className="options-container">
        {checkList.map((option, index) => {
          return (
            <div className="filter-option" key={index}>
              <input
                type="checkbox"
                id={option.option}
                name={option.option}
                value={option.checked}
                checked={option.checked}
                onChange={handleFilter}
              ></input>
              <label htmlFor={option.option}>{option.option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
