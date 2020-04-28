import React, { useContext } from "react";

import ChatContext from "../context/chatContext";
const DisplayMessage = () => {
  const chatContext = useContext(ChatContext);
  const { recivedMessage } = chatContext;

  return (
    <div>
      {recivedMessage}
    </div>
  );
};

export default DisplayMessage;
