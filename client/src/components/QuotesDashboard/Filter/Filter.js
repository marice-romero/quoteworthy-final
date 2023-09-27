import "./Filter.css";

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
    console.log(selection);

    if (input.checked) {
      const index = checkList.findIndex((list) => list.option === selection);
      checkList[index].checked = true;
      setCheckList([...checkList]);
      setIsFiltered(true);

      if (selection === "favorites") {
        console.log("block hit");
        setParams({ ...params, page: 1, favorite: "true" });
      } else {
        setSourceTypesChecked([...sourceTypesChecked, selection]);
      }
    }

    if (!input.checked) {
      const index = checkList.findIndex((list) => list.option === selection);
      checkList[index].checked = false;
      setCheckList([...checkList]);

      if (selection === "favorites") {
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

  console.log(params);

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
