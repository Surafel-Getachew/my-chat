import React from 'react'

const UsersItem = (props) => {
    const {email} = props.user.local
    return (
        <div>
            <p>{email}</p>
            <button>Send Message</button>
        </div>
    )
}

export default UsersItem
