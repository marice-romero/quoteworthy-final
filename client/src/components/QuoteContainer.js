import { Link } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import "./QuoteContainer.css";

const QuoteContainer = ({
  quote,
  params,
  setParams,
  setIsFiltered,
  setCurrentQuote,
}) => {
  const fillEditForm = () => {
    setCurrentQuote(quote);
  };
  return (
    <div className="quote-container">
      {!quote.favorite && (
        <button className="favorite-button">mark as favorite</button>
      )}
      {quote.favorite && (
        <button className="favorite-button">unmark as favorite</button>
      )}
      <QuoteItem
        quote={quote}
        params={params}
        setParams={setParams}
        setIsFiltered={setIsFiltered}
      />

      <Link
        to={`/edit-quote/${quote._id}`}
        params={{ id: quote._id }}
        className="edit-button"
      >
        <button onClick={fillEditForm}>edit quote</button>
      </Link>
    </div>
  );
};

export default QuoteContainer;
