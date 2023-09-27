import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import Pagination from "../Pagination/Pagination";
import QuotesList from "../QuotesList/QuotesList";
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
  sourceTypesChecked,
  setSourceTypesChecked,
}) => {
  const [isFiltered, setIsFiltered] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkList, setCheckList] = useState([
    {
      option: "favorites",
      checked: false,
    },
    {
      option: "movie",
      checked: false,
    },
    {
      option: "TV show",
      checked: false,
    },
    {
      option: "book",
      checked: false,
    },
    {
      option: "video game",
      checked: false,
    },
    {
      option: "poem",
      checked: false,
    },
    {
      option: "song",
      checked: false,
    },
    {
      option: "play",
      checked: false,
    },
    {
      option: "sports",
      checked: false,
    },
    {
      option: "other",
      checked: false,
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  useEffect(() => {
    setParams({ page: 1 });
  }, [setParams]);

  const resetParams = () => {
    setParams({ page: 1 });
    setIsFiltered(false);
    setIsSearched(false);
    setSearchTerm("");
    setSourceTypesChecked([]);
    for (const option of checkList) {
      option.checked = false;
    }

    setCheckList([...checkList]);
  };

  if (user) {
    return (
      <div className="dashboard">
        <div className="left-column">
          <div className="upper-left">
            <h1>my quotes</h1>
          </div>
          <div className="search-container">
            <h1>search & filter</h1>
            <Search
              params={params}
              setParams={setParams}
              fetchQuotes={fetchQuotes}
              setIsSearched={setIsSearched}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Filter
              params={params}
              setParams={setParams}
              fetchQuotes={fetchQuotes}
              setIsFiltered={setIsFiltered}
              checkList={checkList}
              setCheckList={setCheckList}
              sourceTypesChecked={sourceTypesChecked}
              setSourceTypesChecked={setSourceTypesChecked}
            />
            <button className="get-all-button" onClick={resetParams}>
              remove all filters
            </button>
          </div>
        </div>
        <div className="quotes-container">
          <Sort
            params={params}
            setParams={setParams}
            fetchQuotes={fetchQuotes}
          />
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
          <Pagination
            params={params}
            setParams={setParams}
            limit={quotes.limit ? quotes.limit : 0}
            total={hitCount}
          />
          {hitCount === 0 && Object.keys(params).length === 1 && (
            <div className="nothing">
              <h4>nothing comes from nothing, nothing ever will</h4>
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
