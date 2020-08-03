import React, { useContext } from "react";
import ChatContext from "../context/chat/chatContext";

const UsersItem = (props) => {
  const chatContext = useContext(ChatContext);
  const { assignReciver } = chatContext;
  const { email } = props.user.local;
  const id = props.user._id;

  const onClick = (e) => {
    assignReciver(e.target.value);
  };

  return (
    <div>
      <p>{email}</p>
      <button  value={id} onClick={onClick}>
        Send Message
      </button>
    </div>
  );
};

export default UsersItem;
