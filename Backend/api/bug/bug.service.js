import { makeId, readJsonFile, writeJsonFile } from '../../src/services/util.service.js'
import { loggerService } from '../../src/services/logger.service.js'

const bugs = readJsonFile('./data/bug.json')

const PAGE_SIZE = 2

export const bugService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = {}, sort) {
  let filteredBugs = [...bugs]

  if (filterBy.title) {
    const regExp = new RegExp(filterBy.title, 'i')
    filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
  }

  if (filterBy.severity) {
    filteredBugs = filteredBugs.filter(bug => +bug.severity >= +filterBy.severity)
  }

  const by  = (sort && sort.by)  || filterBy.sortBy  || 'createdAt'
  const dir = (sort && typeof sort.dir === 'number')
    ? sort.dir
    : (filterBy.sortDir && filterBy.sortDir.toLowerCase() === 'asc') ? 1 : -1

  filteredBugs.sort((a, b) => {
    switch (by) {
      case 'title': {
        return dir * a.title.localeCompare(b.title)
      }
      case 'severity': {
        const sa = +a.severity, sb = +b.severity
        return dir * (sa - sb)            
      }
      case 'createdAt':
        default: {
        const ta = +a.createdAt, tb = +b.createdAt
        return dir * (ta - tb)              
      }
    }
  })
  if ('pageIdx' in filterBy) {
    const startIdx = filterBy.pageIdx * PAGE_SIZE
    filteredBugs = filteredBugs.slice(startIdx, startIdx + PAGE_SIZE)
  }

  return filteredBugs
}



// async function query(filterBy) {

//     let filteredBugs = bugs

//     if (filterBy.title){
//         const regExp = new RegExp(filterBy.title, 'i')
//         filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
//     }
    
//     if (filterBy.severity){
//         filteredBugs = filteredBugs.filter(bug => bug.severity >= filterBy.severity)
//     }

//     if ('pageIdx' in filterBy) {
//         const startIdx = filterBy.pageIdx * PAGE_SIZE 
//         filteredBugs = filteredBugs.slice(startIdx, startIdx + PAGE_SIZE)
//     }

//     return filteredBugs
// }

async function save(bugToSave) {
    if (bugToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs.splice(idx, 1, bugToSave)
    } else {
        bugToSave._id = makeId()
        bugs.push(bugToSave)
    }
    console.log("to save: ", bugToSave)
    await _saveBugs()
    return bugToSave 
}

async function _saveBugs() {
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
