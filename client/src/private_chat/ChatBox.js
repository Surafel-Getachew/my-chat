import React, { useState,useContext } from "react";
import ChatContext from "../context/chat/chatContext"

const ChatBox = () => {

  const chatContext = useContext(ChatContext);
  const {setCurrentMessage,to} = chatContext;
  
//   room , text
  
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    // setMessage({ ...message, [e.target.name]: e.target.value });
    setMessage(e.target.value);
  };

  const messageInfo = {
      text:message,
      room:to
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentMessage(messageInfo)
  };
  return (
    <div style = {{border:"2px solid black"}}>
      <div style = {{height:"70vh"}}></div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={onChange}
        ></input>
        <br />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default ChatBox;
