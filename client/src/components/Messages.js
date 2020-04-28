import React, { useContext, useState } from "react";
import ChatContext from "../context/chatContext";
import DisplayMessage from "./DisplayMessage";

const Messages = () => {
  const [message, setMessage] = useState("");
  const chatContext = useContext(ChatContext);
  const { setCurrentMessage,currentGroup } = chatContext;

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const messages = {
    text:message,
    room:currentGroup
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentMessage(messages);
  };

  return (
    <div>
      <DisplayMessage />

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          name="message"
          onChange={onChange}
          placeholder="message..."
          required
          autoComplete="off"
        />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};

export default Messages;
