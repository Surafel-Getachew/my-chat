import React,{useReducer} from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {REGISTER_USER} from "../../types";

const AuthState = (props) => {
    
    const initialState = {
        isAuthenticated = null,
        loading:false,
        user:null,
        error:null
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState); 

    const register = async (userData) => {
        
        const config = {
            headers:{
                type:"application/json"
            }
        }

        const res = await axios.post("/mychat/user",userData,config);
        dispatch({type:REGISTER_USER,payload:res.data});
    }


    return (
        <AuthContext.Provider value = {{
            isAuthenticated:state.isAuthenticated,
            user:state.user,
            loading:state.loading,
            error:state.error,
            register
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;