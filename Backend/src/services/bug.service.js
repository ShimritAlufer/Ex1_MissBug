import { makeId, readJsonFile, writeJsonFile } from './util.service.js'
import { loggerService } from './logger.service.js'

const bugs = readJsonFile('./data/bug.json')

export const bugService = {
    query,
    getById,
    save,
    remove,
}

async function query() {
    return bugs
}

async function save(bugToSave) {
    if (bugToSave._id) {
        const idx = bugs.findIndex(bug => bug.id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        bugToSave._id = makeId()
        bugs.push(bugToSave)
    }

    await _saveBugs()
    return bugToSave 
}

function _saveBugs() {
    return writeJsonFile('./data/bug.json', bugs)
} 

async function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)

    if (!bug) {
        loggerService.error(`Couldn't find bug with _id ${bugId}`)
        throw `Couldn't get bug`
    }
    return bug
}


async function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugs()
}
