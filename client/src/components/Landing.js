import React,{useEffect,useContext} from "react";
import {Link} from "react-router-dom"
import AuthContext from "../context/authentication/authContext";
const Landing = () => {
  const authContext = useContext(AuthContext);
  const {loadUser} = authContext;
  useEffect(() => {
    loadUser();
  },[loadUser])
  return (
    <div>
      <h1>My Chat</h1>
      <div>
        <button><Link to="/privatechat">Message/ chats</Link></button>
      </div>
    </div>
  );
};

export default Landing;
