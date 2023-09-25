import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputTags from "./InputTags";
import "./AddQuote.css";

const AddQuote = ({
  user,
  addQuote,
  editQuote,
  mode,
  setCurrentQuote,
  currentQuote,
  deleteQuote,
}) => {
  let initialValues = {
    quoteText: "",
    source: "",
    sourceType: "",
    favorite: false,
    tags: [],
  };

  if (mode === "edit") {
    initialValues = {
      _id: currentQuote._id,
      quoteText: currentQuote.quoteText,
      source: currentQuote.source,
      sourceType: currentQuote.sourceType,
      favorite: currentQuote.favorite,
      tags: currentQuote.tags,
    };
  }

  const [newQuote, setNewQuote] = useState(initialValues);
  const [currentTags, setCurrentTags] = useState(currentQuote.tags);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  const handleCancelEdit = () => {
    setCurrentQuote({
      quoteText: "",
      source: "",
      sourceType: "",
      favorite: false,
      tags: [],
    });
    setCurrentTags([]);
    navigate("/my-quotes");
  };

  const handleInputChange = (e) => {
    setNewQuote({ ...newQuote, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setNewQuote({ ...newQuote, favorite: e.target.checked });
  };

  const updateTags = (newTags) => {
    setNewQuote({ ...newQuote, tags: newTags });
  };

  const handleDelete = () => {
    deleteQuote(currentQuote._id);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (mode === "add") {
      addQuote(newQuote);
      setCurrentTags([]);
      setNewQuote({
        quoteText: "",
        source: "",
        sourceType: "",
        favorite: false,
        tags: [],
      });
    }
    if (mode === "edit") {
      editQuote(newQuote);
      setCurrentTags([]);
      setNewQuote({
        quoteText: "",
        source: "",
        sourceType: "",
        favorite: false,
        tags: [],
      });
      setTimeout(() => {
        navigate("/my-quotes");
      }, 4000);
    }
  };

  return (
    <div className="add-quote">
      {mode === "add" ? (
        <h1>add a quote</h1>
      ) : (
        <div>
          <button className="delete-button" onClick={handleDelete}>
            delete quote
          </button>
          <h3>edit quote</h3>

          <button className="cancel-button" onClick={handleCancelEdit}>
            cancel edit
          </button>
        </div>
      )}
      <div className="add-form">
        <form onSubmit={handleAddSubmit}>
          <label htmlFor="quoteText">
            quote text <small>(without quotation marks)</small>
          </label>
          <textarea
            type="text"
            id="quoteText"
            name="quoteText"
            value={newQuote.quoteText}
            onChange={handleInputChange}
          ></textarea>
          <label htmlFor="source">
            quote source <small>(not required to include)</small>
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={newQuote.source}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="sourceType">choose a source type</label>
          <select
            id="sourceType"
            name="sourceType"
            value={newQuote.sourceType}
            onChange={handleInputChange}
          >
            <option value="">no source type</option>
            <option value="movie">movie</option>
            <option value="TV show">TV show</option>
            <option value="book">book</option>
            <option value="video game">video game</option>
            <option value="poem">poem</option>
            <option value="other">other</option>
          </select>
          <div className="input-favorite">
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              value={newQuote.favorite}
              checked={initialValues.favorite}
              onChange={handleCheckbox}
            ></input>
            <label htmlFor="favorite" className="mark-favorite-label">
              mark as favorite
            </label>
          </div>
          <InputTags
            updateTags={updateTags}
            currentQuote={currentQuote}
            currentTags={currentTags}
            setCurrentTags={setCurrentTags}
          />
          <button type="submit">submit quote</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuote;
