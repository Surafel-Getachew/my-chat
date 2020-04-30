import React,{useState,useContext} from "react";
import {withRouter} from "react-router-dom";
import ChatContext from "../context/chat/chatContext";

const RoomItem = (props) => {
    
    const {name} = props.rooms;
    const [room,setRoom] = useState("");
    const chatContext = useContext(ChatContext);
    const {setCurrentGroup} = chatContext;

    const onClick = (e) => {
        setRoom(e.target.value);
        setCurrentGroup(e.target.value);
        props.history.push("/message");
    }

  return (
    <div>
        <button name = {name} value = {name} onClick = {onClick}> {name} </button>
    </div>
  );
};

export default withRouter(RoomItem);
