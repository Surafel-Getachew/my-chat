import { REGISTER_USER,REGISTER_GOOGLE,REGISTER_FACEBOOK,AUTH_ERROR,LOAD_USERS, LOAD_LOGEDIN_USERS, LOGIN_USER } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_USER,LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        error:false
      }
      case REGISTER_GOOGLE,REGISTER_FACEBOOK:
          localStorage.setItem("token",action.payload.token);
          return {
              ...state,
              isAuthenticated:true,
              token:action.payload
          }
      case AUTH_ERROR:
          return {
              ...state,
              isAuthenticated:false,
              token:null,
              error:true
          }
      case LOAD_USERS: 
          return {
            ...state,
            users:action.payload
          }
      case LOAD_LOGEDIN_USERS:
        return {
          ...state,
          loggedInUser:action.payload
        }    
    default: 
        return state  
  }
};
