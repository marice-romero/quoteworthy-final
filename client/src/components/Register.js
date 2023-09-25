import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = ({ registerUser }) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (newUser.password1 !== newUser.password2) {
      toast.error("the passwords entered do not match", {
        hideProgressBar: true,
      });
    } else {
      registerUser(newUser);
      setNewUser({ email: "", username: "", password1: "", password2: "" });
      setTimeout(() => {
        navigate("/add-quote");
      }, 2000);
    }
  };

  return (
    <div className="register">
      <h1>sign up today</h1>
      <div className="line"></div>
      <div className="register-form">
        <form onSubmit={handleRegisterSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          ></input>
          <small>we'll never share your email with anyone else.</small>
          <label htmlFor="username">choose your handle</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="password1">enter a password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={newUser.password1}
            onChange={handleInputChange}
            placeholder="must be at least 8 characters"
          ></input>{" "}
          <label htmlFor="password2">verify password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={newUser.password2}
            onChange={handleInputChange}
          ></input>
          <button className="register-button" type="submit">
            register
          </button>
        </form>
      </div>

      {/* <p className="register-message">{message}</p> */}
      <div className="line"></div>
      <p className="login-blurb">
        already a user? <Link to="/login">sign in here</Link>
      </p>
    </div>
  );
};

export default Register;
