const users = [];

const addUsers = ({ id, groupName }) => {
  const user = { id, groupName };
  users.push(user);
  return { user };
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return {
      error: "There is no such user",
    };
  }

  return { user };
};

module.exports = {
  addUsers,
  getUser,
};
