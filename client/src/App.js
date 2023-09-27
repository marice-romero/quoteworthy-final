import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/RegisterandLogin/Register";
import Login from "./components/RegisterandLogin/Login";
import QuotesDashboard from "./components/QuotesDashboard/QuotesDashboard/QuotesDashboard";
import AddQuote from "./components/AddandEdit/AddQuote/AddQuote";
import ViewQuote from "./components/AddandEdit/ViewQuote/ViewQuote";
import Footer from "./components/Footer/Footer";
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
                      <h1 className="cover-header">welcome to</h1>
                      <h1 className="inline-logo">quoteworthy</h1>
                      <h1 className="cover-header cover-header-bottom">
                        where we love words as much as you do.
                      </h1>
                      <div className="line"></div>
                      <div className="blurb">
                        <p>
                          whether you read it in a book, heard it in a movie, or
                          recall some long lost lyric from that one song you
                          heard when you were in the middle of a messy breakup,
                          those words meant something to you.
                        </p>

                        <p>
                          we think you should be able to find those words again,
                          tuck them into your back pocket, and be able to pull
                          them out, again and again.
                        </p>
                        <p>
                          consider this your backpocket, and bookmark your
                          favorite quotes all in one convenient place.
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
