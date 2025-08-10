import { loggerService } from '../../src/services/logger.service.js'
import { bugService } from './bug.service.js'

export async function getBugs(req, res)
{
    try{
        const bugs = await bugService.query()
        res.send(bugs)
    }
    catch (err){
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bugs')
    }
}

export async function addBug(req, res) {
    const { _id, title, severity, description } = req.body
    const bugToSave = { _id, title, severity: +severity, description, createdAt: 1542107359454 }
    try{
        const savedBug = await bugService.save(bugToSave)
	    res.send(savedBug)
    }
    catch(err){
        loggerService.error('Cannot add bug', err)
        res.status(400).send('Cannot add bug')

    }
    
}

export async function updateBug(req, res) {
    const { _id, title, severity, description } = req.body
    const bugToSave = { _id, title, severity: +severity, description, createdAt: 1542107359454 }
    try{
        const savedBug = await bugService.save(bugToSave)
	    res.send(savedBug)
    }
    catch(err){
        loggerService.error('Cannot update bugs', err)
        res.status(400).send('Cannot update bugs')

    }
    
}

export async function getBug(req, res){
    const bugId = req.params.bugId
    try {
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        loggerService.error('Cannot get bug')
        res.status(404).send('Cannot get bug')
    }
}

export async function removeBug(req, res){
    const bugId = req.params.bugId

    try{
        await bugService.remove(bugId)
        res.send('Bug deleted!')
    }
    catch(err) {
        loggerService.error('Cannot delete bug')
        res.status(404).send('Cannot delete bug')

    }
    
}