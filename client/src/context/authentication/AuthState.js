import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import { REGISTER_USER,LOGIN_USER,REGISTER_FACEBOOK,REGISTER_GOOGLE,AUTH_ERROR,LOAD_USERS,LOAD_LOGEDIN_USERS } from "../../types";

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    loading: false,
    token: "",
    users: [],
    loggedInUser:null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);


  const loadUser = async () => {
    // load token in global header
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/mychat/user");
      dispatch({ type: LOAD_LOGEDIN_USERS, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          type: "application/json",
        },
      };
      const res = await axios.post("/mychat/user/signup", userData, config);
      dispatch({ type: REGISTER_USER, payload: res.data });
      loadUser();
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const login = async (userData) => {
    try {
      const config = {
        headers: {
          type:"application/json"
        }
      }
      const res = await axios.post("/mychat/user/signin",userData,config);
      dispatch({type:LOGIN_USER,payload:res.data});
      loadUser();
    } catch (error) {
      dispatch({type:AUTH_ERROR});
    }
  }

  const registerGoogle = async(data) => {
      try {
          const res = await axios.post("/mychat/user/google",{access_token:data});
          dispatch({type:REGISTER_GOOGLE,payload:res.data});
          } catch (error) {
          dispatch({type:AUTH_ERROR});
      }
  }

  const registerFacebook = async(data) => {
     try {
          const res = await axios.post("/mychat/user/facebook",{access_token:data});
          dispatch({type:REGISTER_FACEBOOK,payload:res.data});
          } catch (error) {
          dispatch({type:AUTH_ERROR});
      }
  }

  const loadAllUsers = async () => {
    try {
      const res = await axios.get("/mychat/user/all");
      dispatch({type:LOAD_USERS,payload:res.data})
    } catch (error) {
      
    }
  }


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        users:state.users,
        loggedInUser:state.loggedInUser,
        loadUser,
        loadAllUsers,
        register,
        login,
        registerFacebook,
        registerGoogle
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
