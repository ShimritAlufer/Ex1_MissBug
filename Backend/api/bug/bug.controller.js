import { loggerService } from '../../src/services/logger.service.js'
import { bugService } from './bug.service.js'


export async function getBugs(req, res) {
  try {
    const {
      title = '',
      severity = '',
      pageIdx,
      sortBy,
      sortDir, 
    } = req.query

    const filterBy = { title }
    if (severity !== '') filterBy.severity = +severity
    if (pageIdx !== undefined && pageIdx !== '') filterBy.pageIdx = +pageIdx

    const dir =
      (typeof sortDir === 'string')
        ? (sortDir.toLowerCase() === 'asc' ? 1 : -1)
        : (sortBy === 'createdAt' ? -1 : 1)

    const bugs = await bugService.query(filterBy, { by: sortBy || 'createdAt', dir })
    res.send(bugs)
  } catch (err) {
    loggerService.error('Cannot get bugs', err)
    res.status(400).send('Cannot get bugs')
  }
}



// export async function getBugs(req, res)
// {
//     console.log('req.query:', req.query)
//     const { title, severity, pageIdx} = req.query
    
//     const filterBy = { title, severity: +severity}

//     if(pageIdx !== undefined) filterBy.pageIdx = +pageIdx

//     try{
//         const bugs = await bugService.query(filterBy)
//         res.send(bugs)
//     }
//     catch (err){
//         loggerService.error('Cannot get bugs', err)
//         res.status(400).send('Cannot get bugs')
//     }
// }

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
    console.log("to save: ", bugToSave)
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