import React, { useReducer, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import ChatContext from "./chatContext";
import ChatReducer from "./chatReducer";
import {
  SET_CURRENT_MESSAGE,
  CREATE_ROOM,
  SET_CURRENT_GROUP,
  LOAD_ROOMS,
  SET_RECIVED_MESSAGE,
} from "../types";

const ChatState = (props) => {
  const socket = io("http://localhost:500");

  const initialState = {
    socket,
    room: [],
    currentMessage: "",
    recivedMessage: "",
    currentGroup: "",
    loadMessage: null,
  };

  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const createRoom = (formData) => {
    const config = {
      headers: {
        type: "application/json",
      },
    };

    try {
      const res = axios.post("/mychat/channel", formData, config);
      dispatch({ type: CREATE_ROOM, payload: res.data });
    } catch (error) {}
  };

  const loadRoom = () => {
    try {
      const res = axios.get("/mychat/channel");
      dispatch({type:LOAD_ROOMS,payload:res.data})
    } catch (error) {
      
    }
  }

  const setCurrentGroup = (groupName) => {
    socket.emit("join", groupName);
    dispatch({ type: SET_CURRENT_GROUP, payload: groupName });
  };

  socket.on("message", (message) => {
    dispatch({ type: SET_RECIVED_MESSAGE, payload: message });
  });

  const setCurrentMessage = (message) => {
    socket.emit("send", message);
    dispatch({ type: SET_CURRENT_MESSAGE, payload: message.text });
  };

  return (
    <ChatContext.Provider
      value={{
        socket: state.socket,
        room: state.room,
        currentMessage: state.currentMessage,
        currentGroup: state.currentGroup,
        loadMessage: state.loadMessage,
        recivedMessage: state.recivedMessage,
        setCurrentMessage,
        createRoom,
        setCurrentGroup,
        // setRecivedMessage,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;

// const setRecivedMessage = () => {
//   socket.on("message",message => {
//     dispatch({type:SET_RECIVED_MESSAGE,payload:message})
//   })
// }
