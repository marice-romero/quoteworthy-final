import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast("you're logged out! parting is such sweet sorrow...", {
      hideProgressBar: true,
    });
    navigate("/");
  };
  return (
    <div className="navbar">
      <h5 className="logo">
        <FontAwesomeIcon icon={faFeather} /> quoteworthy.
      </h5>
      <div className="nav-links">
        <Link to="my-quotes">my quotes</Link>
        <Link to="add-quote">add quote</Link>
      </div>
      <div className="user-link">
        {user && (
          <div>
            <h4>{user.username} is logged in</h4>
            <button onClick={handleLogout}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
