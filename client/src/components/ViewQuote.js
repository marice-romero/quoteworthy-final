import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import QuoteItem from "./QuoteItem";
import AddQuote from "./AddQuote";
import "./ViewQuote.css";

const ViewQuote = ({
  user,
  editQuote,
  currentQuote,
  fetchSingleQuote,
  deleteQuote,
  setCurrentQuote,
}) => {
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchSingleQuote(id);
  }, [id]);

  if (Object.keys(currentQuote) === 0) {
    return <h3>still loading...</h3>;
  } else {
    return (
      <div className="view-quote-container">
        <div className="quote-container single-quote-container">
          <QuoteItem quote={currentQuote} view="single" />
        </div>

        <AddQuote
          user={user}
          editQuote={editQuote}
          currentQuote={currentQuote}
          mode="edit"
          setCurrentQuote={setCurrentQuote}
          deleteQuote={deleteQuote}
        />
      </div>
    );
  }
};

export default ViewQuote;
