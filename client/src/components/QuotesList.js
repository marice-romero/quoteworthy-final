import QuoteContainer from "./QuoteContainer";

const QuotesList = ({
  quotes,
  deleteQuote,
  editQuote,
  user,
  params,
  setParams,
  setIsFiltered,
  setCurrentQuote,
}) => {
  return (
    <div className="quotes-list">
      {quotes.map((quote) => {
        return (
          <QuoteContainer
            key={quote._id}
            quote={quote}
            deleteQuote={deleteQuote}
            editQuote={editQuote}
            user={user}
            params={params}
            setParams={setParams}
            setIsFiltered={setIsFiltered}
            setCurrentQuote={setCurrentQuote}
          />
        );
      })}
    </div>
  );
};

export default QuotesList;
