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
  ASSIGN_SENDER,
  ASSIGN_RECIVER
} from "../../types";

const ChatState = (props) => {
  const socket = io("http://localhost:500");

  const initialState = {
    socket,
    to:"",
    from:"",
    rooms: [],
    currentMessage: "",
    recivedMessage: "",
    currentGroup: "",
    loadMessage: null,
  };

  const [state, dispatch] = useReducer(ChatReducer, initialState);

  const assignSender = (sender) => {
    dispatch({type:ASSIGN_SENDER,payload:sender})
  }

  const assignReciver = (reciver) => {
    dispatch({type:ASSIGN_RECIVER,payload:reciver})
  }


  const setCurrentGroup = (groupName) => {
    socket.emit("join", groupName);
    dispatch({ type: SET_CURRENT_GROUP, payload: groupName });
  };

  const setCurrentMessage = (message) => {
    socket.emit("send", message);
    dispatch({ type: SET_CURRENT_MESSAGE, payload: message.text });
  };
  
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

  const loadRooms = async () => {
    try {
      const res = await axios.get("/mychat/channel");
      dispatch({type:LOAD_ROOMS,payload:res.data})
    } catch (error) {
      
    }
  }

  socket.on("message", (message) => {
    dispatch({ type: SET_RECIVED_MESSAGE, payload: message });
  });


  return (
    <ChatContext.Provider
      value={{
        socket: state.socket,
        rooms: state.rooms,
        to:state.to,
        from:state.from,
        currentMessage: state.currentMessage,
        currentGroup: state.currentGroup,
        loadMessage: state.loadMessage,
        recivedMessage: state.recivedMessage,
        assignSender,
        assignReciver,
        setCurrentMessage,
        createRoom,
        setCurrentGroup,
        loadRooms
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
