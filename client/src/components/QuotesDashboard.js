import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "./Search";
import Filter from "./Filter";
import Sort from "./Sort";
import QuotesList from "./QuotesList";
import pencils from "../assets/pencils.jpg";
import "./QuotesDashboard.css";

const QuotesDashboard = ({
  user,
  quotes,
  fetchQuotes,
  deleteQuote,
  editQuote,
  hitCount,
  params,
  setParams,
  setCurrentQuote,
}) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  useEffect(() => {
    setParams({});
  }, [setParams]);

  const resetParams = () => {
    setParams({});
    setIsFiltered(false);
    setIsSearched(false);
  };

  const handleFavorites = () => {
    setParams({ ...params, favorite: "true" });
    setIsFiltered(true);
  };

  if (user) {
    return (
      <div className="dashboard">
        <div className="left-column">
          <div className="upper-left">
            <h1>{user.username}'s quotes</h1>
          </div>
          <div className="search-container">
            <h1>search & filter</h1>
            <Search
              params={params}
              setParams={setParams}
              fetchQuotes={fetchQuotes}
              setIsSearched={setIsSearched}
            />

            <Filter
              params={params}
              setParams={setParams}
              fetchQuotes={fetchQuotes}
              setIsFiltered={setIsFiltered}
            />
            <button href="#" name="favorite" onClick={handleFavorites}>
              only show favorites
            </button>

            {(isFiltered || isSearched) && (
              <button className="get-all-button" onClick={resetParams}>
                get all quotes
              </button>
            )}
          </div>
        </div>

        <div className="quotes-container">
          {(isSearched || isFiltered) && (
            <small className="results">
              {isSearched && (
                <span>
                  results for{" "}
                  <span className="search-term">{params.search}</span>,
                </span>
              )}{" "}
              showing {hitCount} {hitCount === 1 ? "result" : "results"}
            </small>
          )}
          <Sort
            params={params}
            setParams={setParams}
            fetchQuotes={fetchQuotes}
          />
          {hitCount === 0 && Object.keys(params).length === 0 && (
            <div>
              <h4>nothing to see here</h4>
              <Link to="/add-quote">start adding quotes here</Link>
            </div>
          )}
          <QuotesList
            quotes={quotes}
            deleteQuote={deleteQuote}
            editQuote={editQuote}
            user={user}
            fetchQuotes={fetchQuotes}
            params={params}
            setParams={setParams}
            setIsFiltered={setIsFiltered}
            setCurrentQuote={setCurrentQuote}
          />
        </div>
      </div>
    );
  }
};

export default QuotesDashboard;
