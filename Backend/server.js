import express from 'express' 
import cors from 'cors'
import { bugService } from './src/services/bug.service.js'
import { loggerService } from './src/services/logger.service.js'

const app = express() 
const bugs = await bugService.query()
app.use(express.static('public'))

const corsOptions = {
	origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174',
    ],
	credentials: true,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => res.send('Hello there')) 
app.listen(3030, () => console.log('Server ready at http://127.0.0.1:3030/api/bug'))

app.get('/api/bug', async (req, res) => { res.send(bugs)})

app.get('/api/bug/save', async (req, res) => {
    const { _id, title, severity, description } = req.query
    const bugToSave = { _id, title, severity: +severity, description, createdAt: 1542107359454 }
    const savedBug = await bugService.save(bugToSave)
	res.send(savedBug)
})

app.get('/api/bug/:bugId', async (req, res) => { 
    const bugId = req.params.bugId
    try {
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        loggerService.error(err)
        res.status(404).send(err)
    }
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    const bugId = req.params.bugId

    await bugService.remove(bugId)
    res.send(bugs)
})