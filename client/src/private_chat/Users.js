import React,{useContext,useEffect} from 'react'
import AuthContext from "../context/authentication/authContext";
import UsersItem from "./UsersItem"

const Users = () => {
    const authContext = useContext(AuthContext);
    const {loadAllUsers,users} = authContext;
    useEffect(() => {
        loadAllUsers();
    },[loadAllUsers])

    return (
        <div>
            {users.map((user) => (
                <div>
                    <UsersItem user={user} />
                </div>
            ))}
        </div>
    )
}

export default Users;
