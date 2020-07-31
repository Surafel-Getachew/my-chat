import React, { useState, useContext } from "react";
import AuthContext from "../../context/authentication/authContext";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const Signup = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const { register, registerGoogle, registerFacebook, error } = authContext;

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(user);
    if (error == false) {
      props.history.push("/");
    }
    console.log(user);
  };

  const responseGoogle = (res) => {
    console.log("responseGoogle", res);
    registerGoogle(res.accessToken);
    // if (error !== false) {
    //   props.history.push("/");
    // }
  };

  const responseFacebook = (res) => {
    console.log("responseFacebook", res);
    registerFacebook(res.accessToken);
    if (error !== false) {
      props.history.push("/");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
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
        <input type="submit" value="signup" />
      </form>
      <div>
        <FacebookLogin
          appId="295992234734931"
          autoLoad={false}
          //   textButton="Sign up with facebook"
          fields="name,email,picture"
          callback={responseFacebook}
        />{" "}
        <br />
        {/* <GoogleLogin
          clientId="399788636327-5v1491na1eaj69ou453v0r7bm8tp2ajt.apps.googleusercontent.com"
          onSuccess = {responseGoogle}
          onFailure = {responseGoogle}
        /> */}
        <GoogleLogin
          clientId="399788636327-5v1491na1eaj69ou453v0r7bm8tp2ajt.apps.googleusercontent.com"
          buttonText="google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  );
};

export default Signup;
