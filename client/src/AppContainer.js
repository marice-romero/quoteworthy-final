import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import App from "./App";

const AppContainer = () => {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [hitCount, setHitCount] = useState(0);
  const [params, setParams] = useState({ page: 1 });
  const [currentQuote, setCurrentQuote] = useState({
    quoteText: "",
    source: "",
    sourceType: "",
    favorite: false,
    tags: [],
  });
  const [sourceTypesChecked, setSourceTypesChecked] = useState([]);

  const errorMessage =
    "there is a disturbance in the force - please try again later.";

  // register user
  const registerUser = async (newUser) => {
    try {
      const response = await fetch(
        "https://quoteworthy.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password1,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        toast.success("success! welcome to quoteworthy!");
        localStorage.setItem("token", data.token);
        setUser(newUser);
        return data;
      } else {
        console.log(data.msg);
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  // log in user
  const authenticateUser = async (currentUser) => {
    try {
      const response = await fetch(
        "https://quoteworthy.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser.email,
            password: currentUser.password,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(`welcome back, ${data.user.username}`);
        localStorage.setItem("token", data.token);
        setUser({
          email: currentUser.email,
          username: data.user.username,
        });

        // return data;

        // document.dispatchEvent(thisEvent);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error(errorMessage);
    }
  };

  // fetch quotes when params is updated
  useEffect(() => {
    const fetchQuotes = async (params) => {
      // turn non-array params into url
      let queryParams = new URLSearchParams(params);
      // append filter array params one by one
      if (sourceTypesChecked) {
        sourceTypesChecked.forEach((sourceType) =>
          queryParams.append("sourceType", sourceType)
        );
      }

      try {
        const response = await fetch(
          `https://quoteworthy.onrender.com/api/v1/quotes?${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          if (data.count === 0) {
            setQuotes([]);
            setHitCount(0);
            return 0;
          } else {
            setQuotes(data.quotes);
            setHitCount(data.count);
          }
          return data.count;
        } else {
          toast.error(data.msg);
          return 0;
        }
      } catch (err) {
        console.log(err);
        toast.error(errorMessage);
        return 0;
      }
    };
    if (user) {
      fetchQuotes(params);
    }
  }, [params, user, sourceTypesChecked]);

  // fetch single quote
  const fetchSingleQuote = async (id) => {
    try {
      const response = await fetch(
        `https://quoteworthy.onrender.com/api/v1/quotes/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setCurrentQuote(data.quote);
        return data.count;
      } else {
        toast.error(data.msg);
        return 0;
      }
    } catch (err) {
      toast.error(errorMessage);
      return 0;
    }
  };

  // add quote
  const addQuote = async (quote) => {
    try {
      const response = await fetch(
        "https://quoteworthy.onrender.com/api/v1/quotes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            quoteText: quote.quoteText,
            source: quote.source,
            sourceType: quote.sourceType,
            favorite: quote.favorite,
            tags: quote.tags,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        toast.success("quote successfully added!");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  const deleteQuote = async (id) => {
    try {
      const newQuotes = quotes.filter((quote) => id !== quote._id);
      setQuotes(newQuotes);
      const response = await fetch(
        `https://quoteworthy.onrender.com/api/v1/quotes/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast("the quote has been deleted.", { hideProgressBar: true });
        // quoteText.value = "";
        // source.value = "";
        // sourceType.value = "choose a source type";
        // thisEvent = new Event("startDisplay");
        // document.dispatchEvent(thisEvent);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(errorMessage);
    }
  };

  const editQuote = async (quote, mode) => {
    try {
      const response = await fetch(
        `https://quoteworthy.onrender.com/api/v1/quotes/${quote._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            quoteText: quote.quoteText,
            source: quote.source,
            sourceType: quote.sourceType,
            favorite: quote.favorite,
            tags: quote.tags,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        if (mode === "edit") {
          toast.success(
            "the quote was updated. redirecting you back to all quotes..."
          );
        }
        let updatedQuotes = quotes.map((quoteItem) => {
          if (quoteItem._id === quote._id) {
            return quote;
          } else {
            return quoteItem;
          }
        });
        setQuotes(updatedQuotes);
        setCurrentQuote({
          quoteText: "",
          source: "",
          sourceType: "",
          favorite: false,
          tags: [],
        });
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
      toast.error(errorMessage);
    }
  };

  return (
    <App
      user={user}
      setUser={setUser}
      quotes={quotes}
      setQuotes={setQuotes}
      currentQuote={currentQuote}
      setCurrentQuote={setCurrentQuote}
      registerUser={registerUser}
      authenticateUser={authenticateUser}
      addQuote={addQuote}
      fetchSingleQuote={fetchSingleQuote}
      deleteQuote={deleteQuote}
      editQuote={editQuote}
      hitCount={hitCount}
      params={params}
      setParams={setParams}
      sourceTypesChecked={sourceTypesChecked}
      setSourceTypesChecked={setSourceTypesChecked}
    />
  );
};

export default AppContainer;
