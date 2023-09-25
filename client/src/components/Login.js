import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import PropTypes from "prop-types";

const Login = ({ authenticateUser }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleLogonSubmit = (e) => {
    e.preventDefault();
    authenticateUser(currentUser);
    setTimeout(() => {
      setCurrentUser({
        email: "",
        password: "",
      });
      navigate("/my-quotes");
    }, 2000);
  };

  return (
    <div className="register">
      <h1>sign in</h1>
      <div className="register-form">
        <form onSubmit={handleLogonSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={currentUser.email}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={currentUser.password}
            onChange={handleInputChange}
          ></input>
          <button type="submit" className="register-button">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
