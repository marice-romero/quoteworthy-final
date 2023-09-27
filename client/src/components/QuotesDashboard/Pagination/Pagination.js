import "./Pagination.css";

const Pagination = ({ params, total, setParams }) => {
  const totalPages = Math.ceil(total / 5);

  let pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  const handlePage = (newPage) => {
    setParams({ ...params, page: newPage });
  };

  if (totalPages > 0) {
    return (
      <div className="page-container">
        <span>go to page: </span>
        {pageNumbers.map((page) => {
          return (
            <button
              onClick={() => handlePage(page)}
              className={
                params.page === page ? "page-button page-active" : "page-button"
              }
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
  }
};

export default Pagination;
