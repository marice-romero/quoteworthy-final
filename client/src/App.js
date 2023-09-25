import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import QuotesDashboard from "./components/QuotesDashboard";
import AddQuote from "./components/AddQuote";
import ViewQuote from "./components/ViewQuote";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App({
  user,
  setUser,
  quotes,
  registerUser,
  authenticateUser,
  fetchQuotes,
  addQuote,
  deleteQuote,
  editQuote,
  hitCount,
  params,
  setParams,
  currentQuote,
  setCurrentQuote,
  fetchSingleQuote,
}) {
  return (
    <>
      <BrowserRouter>
        {user && <Navbar user={user} setUser={setUser} />}

        <Routes>
          <Route
            path="/"
            element={
              <div className="cover-page">
                <div className="both-container">
                  <div className="blurb-container">
                    <h1>
                      if you always find something you find{" "}
                      <span className="logo">quoteworthy</span> ...
                    </h1>
                    <div className="blurb">
                      <p>...you're in the right place.</p>
                      <p>
                        welcome to <span className="logo">quoteworthy</span>, a
                        place for lovers of words
                      </p>
                      <p>
                        save all of your favorite quotes across all different
                        media types in one convenient place.
                      </p>
                    </div>
                  </div>

                  <div className="register-container">
                    <Register registerUser={registerUser} />
                  </div>
                </div>
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <div className="cover-page">
                <div className="sign-in-container">
                  {" "}
                  <Login authenticateUser={authenticateUser} />
                </div>
              </div>
            }
          ></Route>
          <Route
            path="/my-quotes"
            element={
              <QuotesDashboard
                user={user}
                quotes={quotes}
                fetchQuotes={fetchQuotes}
                deleteQuote={deleteQuote}
                editQuote={editQuote}
                hitCount={hitCount}
                params={params}
                setParams={setParams}
                setCurrentQuote={setCurrentQuote}
              />
            }
          ></Route>
          <Route
            path="/add-quote"
            element={
              <div className="add-quote-container">
                <AddQuote
                  user={user}
                  addQuote={addQuote}
                  mode={"add"}
                  currentQuote={currentQuote}
                />
              </div>
            }
          ></Route>
          <Route
            path="/edit-quote/:id"
            element={
              <ViewQuote
                user={user}
                editQuote={editQuote}
                currentQuote={currentQuote}
                fetchSingleQuote={fetchSingleQuote}
                setCurrentQuote={setCurrentQuote}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
