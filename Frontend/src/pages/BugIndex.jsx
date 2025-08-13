import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { downloadPDFBugs } from '../services/bugPdf.service.js'


export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

  useEffect(() => {
    loadBugs()
  }, [filterBy])

  async function loadBugs() {
    console.log('loading cars')
    try{
      const bugs = await bugService.query(filterBy)
      setBugs(bugs)
    }
    catch(err){
      console.log('err:', err)
    }
   
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log('Deleted Succesfully!')
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      description: prompt('Bug description?'),
    }
    try {
      const savedBug = await bugService.save(bug)
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }
    try {

      const savedBug = await bugService.save(bugToSave)
      console.log('Updated Bug:', savedBug)
      setBugs(prevBugs => prevBugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ))
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.log('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

    function onSetFilterBy(filterBy) {
      setFilterBy(prevFilter => {
          let pageIdx = undefined
          if (prevFilter.pageIdx !== undefined) pageIdx = 0
          return { ...prevFilter, ...filterBy,  pageIdx }
      })
  }

    function onChangePageIdx(pageIdx) {
        if (pageIdx < 0) return
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx }))
    }


  const { pageIdx, ...restOfFilter } = filterBy

  const isPaging = pageIdx !== undefined

  return (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <main>
      <div>
          <label> Use paging
              <input type="checkbox" checked={isPaging} onChange={() => onChangePageIdx(isPaging ? undefined : 0)} />
          </label>
          {isPaging && <>
              <button onClick={() => onChangePageIdx(pageIdx - 1)}>-</button>
              <span>{pageIdx + 1}</span>
              <button onClick={() => onChangePageIdx(pageIdx + 1)}>+</button>
          </>}
        </div>
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <BugFilter filterBy={restOfFilter} onSetFilterBy={onSetFilterBy}/>
        <div>
          <label>Sort by: </label>
          <select
            value={filterBy.sortBy}
            onChange={e => onSetFilterBy({ sortBy: e.target.value })}
          >
            <option value="createdAt">Date</option>
            <option value="title">Title</option>
            <option value="severity">Severity</option>
          </select>

          <button
            onClick={() => onSetFilterBy({
              sortDir: filterBy.sortDir === 'asc' ? 'desc' : 'asc'
            })}
          >
            {filterBy.sortDir === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        <button onClick={() => downloadPDFBugs(bugs)}>
          Download Bugs as PDF file
        </button>
      </main>
    </main>
  )
}
