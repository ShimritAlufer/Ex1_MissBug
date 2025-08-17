import resct, { useState, useEffect } from "react"

import { userService } from '../services/user.service.js';

export function UserIndex() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.query().then(setUsers)
    }, [])

    async function onRemoveUser(userId) {
        try {

            await userService.remove(userId)
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
            console.log('Removed successfully - user MSG YAY');
        } catch (err) {
            console.log('here is the msg from the server', err.response.data)
            console.log('Had issues removing the user')
        }
    }

    return <section className="admin-dashboard">

        <hr />

        <h3>Here are the usersss</h3>

        {
            users.map(user => <div key={user._id} style={{ border: "1px solid black", padding: "15px", margin: "10px" }}>
                <h4>user name: {user.username}</h4>
                <h4>id: {user._id}</h4>
                <button onClick={() => onRemoveUser(user._id)}>Remove this user</button>
            </div>)
        }


        <pre>
            {JSON.stringify(users, null, 2)}
        </pre>


    </section>
}