import React, { useContext, useEffect } from "react";
import AuthContext from "../context/authentication/authContext";
import ChatContext from "../context/chat/chatContext";
import UsersItem from "./UsersItem";

const Users = () => {
  const authContext = useContext(AuthContext);
  const { loadAllUsers, users, loggedInUser } = authContext;

  const chatContext = useContext(ChatContext);
  const { assignSender,setCurrentGroup} = chatContext;

  useEffect(() => {
    loadAllUsers();
  }, [loadAllUsers]);

  useEffect(() => {
    assignSender(loggedInUser._id);
    setCurrentGroup(loggedInUser._id);
  }, [loggedInUser]);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <UsersItem user={user} />
        </div>
      ))}
    </div>
  );
};

export default Users;
