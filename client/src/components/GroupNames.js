import React, { useState, useContext, useEffect } from "react";
import ChatContext from "../context/chatContext";

const GroupNames = (props) => {
  
  const chatContext = useContext(ChatContext);
  const {setCurrentGroup } = chatContext;
  const [groupName, setGroupName] = useState("");

  const { gn } = groupName;
  const onClick = (e) => {
    setGroupName(e.target.value);
    setCurrentGroup(e.target.value);
    props.history.push("/message");
  };

  return (
    <div>
      <div>{gn}</div>
      <button name="addiction" value="addiction" onClick={onClick}>
        Addiction
      </button>
      <button name="depression" value="depression" onClick={onClick}>
        depression
      </button>
      <button name="confusion" value="confusion" onClick={onClick}>
        confusion
      </button>
    </div>
  );
};

export default GroupNames;
