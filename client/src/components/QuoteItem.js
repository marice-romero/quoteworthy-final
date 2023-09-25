import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./QuoteItem.css";

const QuoteItem = ({ quote, params, setParams, setIsFiltered, view }) => {
  const handleTagClick = ({ currentTarget: input }) => {
    setParams({ ...params, page: 1, tag: input.name });
    setIsFiltered(true);
  };

  return (
    <div className="quote-meat">
      <span className="quote-text">
        <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />{" "}
        {quote.quoteText}{" "}
        <FontAwesomeIcon icon={faQuoteRight} className="quote-icon" />
      </span>
      <p className="source">-{quote.source || "unknown"}</p>
      <p className="source-type">type: {quote.sourceType}</p>
      <div className="tags-container">
        <span className="tags-header" htmlFor="tags-list">
          tags:
        </span>
        <ul id="tags-list" className="tags-list">
          {quote.tags.map((tag) => {
            if (view === "single") {
              return (
                <li key={tag} className="tag">
                  {tag}
                </li>
              );
            } else {
              return (
                <li key={tag} className="tag">
                  <button name={tag} onClick={handleTagClick}>
                    {tag}
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuoteItem;
