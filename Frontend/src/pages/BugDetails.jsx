
import { useState } from 'react'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot load bug')

        }
    }

    if (!bug) return <h1>loadings....</h1>

    return <div className="bug-details main-layout">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Severity: <span>{bug.severity}</span></p>
        <section>
            <h5>Description</h5>
            <p>{bug.description}</p>
        </section>
        
        <section><button><Link to="/bug">Back to List</Link></button></section>
        
    </div>

}

