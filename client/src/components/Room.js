import React, { useContext,useEffect } from "react";
import ChatContext from "../context/chat/chatContext";
import RoomItem from "./RoomItem";

const Room = () => {
    const chatContext = useContext(ChatContext);
    const {rooms,loadRooms} = chatContext;

    useEffect(() => {
        loadRooms();
    },[])

    return (
        <div>
            {rooms.map(room => (
               <div key = {room._id}>
                   {/* <h1>{room.name}</h1> */}
                   <RoomItem rooms = {room} />
                </div>
            ))}
        </div>
    )
};

export default Room;
