import React, { useState, useEffect } from 'react'

import { BugList } from "../cmps/BugList.jsx"
import { bugService } from "../services/bug.service.js"
import { userService } from "../services/user.service.js"

export function UserProfile() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    const [bugsToShow, setBugsToShow] = useState([])

    useEffect(() => {
        loadUserBugs()
    }, [])

    function loadUserBugs() {
        console.log('hi:')

        bugService.query({ ownerId: user._id }).then((res) => {
            console.log('res:', res)

            setBugsToShow(res)
        })
    }

    // Can implement full crudl on bugs here~

    console.log(bugsToShow);
    return <section className="user-profile">
        <h1>Hello {user.username}</h1>

        <hr />
        <p>Your bugs!</p>
        <BugList bugs={bugsToShow} />
        <pre>
            {JSON.stringify(bugsToShow, null, 2)}
        </pre>

        <hr />
    </section>
}