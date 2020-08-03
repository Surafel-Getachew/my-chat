import React from 'react'
import Users from "./Users";
import ChatBox from "./ChatBox";
import styles from "./chatbox.module.css"

const ChatPage = () => {
    return (
        <div className = {styles.chatContainer}>
            <Users/>
            <ChatBox/>
        </div>
    )
}

export default ChatPage
