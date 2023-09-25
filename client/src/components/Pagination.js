import "./Pagination.css";

const Pagination = ({ params, total, limit, setParams }) => {
  const totalPages = Math.ceil(total / 5);

  let pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  const handlePage = (newPage) => {
    setParams({ ...params, page: newPage });
  };

  return (
    <div className="page-container">
      <span>go to page: </span>
      {totalPages > 0 &&
        pageNumbers.map((page) => (
          <button
            onClick={() => handlePage(page)}
            className={
              params.page === page ? "page-button page-active" : "page-button"
            }
            key={page}
          >
            {page}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
