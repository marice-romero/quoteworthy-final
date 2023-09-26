import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import QuotesDashboard from "./components/QuotesDashboard";
import AddQuote from "./components/AddQuote";
import ViewQuote from "./components/ViewQuote";
import Footer from "./components/Footer";
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
  sourceTypesChecked,
  setSourceTypesChecked,
}) {
  return (
    <>
      <BrowserRouter>
        {user && <Navbar user={user} setUser={setUser} />}

        <Routes>
          <Route
            path="/"
            element={
              <div className="wrapper">
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
                          welcome to <span className="logo">quoteworthy</span>,
                          a place for lovers of words
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
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <div className="wrapper">
                <div className="cover-page">
                  <div className="sign-in-container">
                    <Login authenticateUser={authenticateUser} />
                  </div>
                </div>
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/my-quotes"
            element={
              <div>
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
                  sourceTypesChecked={sourceTypesChecked}
                  setSourceTypesChecked={setSourceTypesChecked}
                />
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/add-quote"
            element={
              <div>
                <div className="add-quote-container">
                  <AddQuote
                    user={user}
                    addQuote={addQuote}
                    mode={"add"}
                    currentQuote={currentQuote}
                    setParams={setParams}
                  />
                </div>
                <Footer />
              </div>
            }
          ></Route>
          <Route
            path="/edit-quote/:id"
            element={
              <div>
                <ViewQuote
                  user={user}
                  editQuote={editQuote}
                  currentQuote={currentQuote}
                  fetchSingleQuote={fetchSingleQuote}
                  setCurrentQuote={setCurrentQuote}
                  setParams={setParams}
                />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
