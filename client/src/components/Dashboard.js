import React, { useState, useContext } from "react";

import ChatContext from "../context/chatContext";

const Dashboard = () => {
  const chatContext = useContext(ChatContext);
  const { createRoom } = chatContext;

  const [room, setRoom] = useState({
    name: "",
    info: "",
  });

  const onChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createRoom(room);
  };

  const { name, info } = room;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="room name"
          value={name}
          name="name"
          onChange={onChange}
        />
        <br />
        <textarea
          type="text"
          placeholder="about room "
          value={info}
          name="info"
          onChange={onChange}
        />
        <br />
        <input type="submit" value="create room" />
      </form>
    </div>
  );
};

export default Dashboard;
