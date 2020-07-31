import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";
import { Redirect,withRouter } from "react-router-dom";

const SignIn = (props) => {
  const authContext = useContext(AuthContext);
  const { login, error } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error == false) {
      props.histor.push("/")
    }
  }, [error,props.history]);

  const redirect = () => {
      return <Redirect to="/" />;
  }

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          name="email"
          onChange={onChange}
          required
          placeholder="email"
        />{" "}
        <br />
        <input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          required
          placeholder="password"
        />{" "}
        <br />
        <input type="submit" value="signin" />
      </form>
    </div>
  );
};

export default withRouter(SignIn);
