import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}


// async function query() {
//     var res = await axios.get(BASE_URL)
//     var bugs = res.data

//     return bugs
// }

async function query(filterBy = {}) {

    var {data:bugs} = await axios.get(BASE_URL)

    if (filterBy.title){
        const regExp = new RegExp(filterBy.title, 'i')
        bugs = bugs.filter(bug => regExp.test(bug.title))
    }
    
    if (filterBy.severity){
        bugs = bugs.filter(bug => bug.severity >= filterBy.severity)
    }

    return bugs
}

async function getById(bugId) {
    var res = await axios.get(BASE_URL + '/' + bugId)
    return res.data
}

async function remove(bugId) {
    return await axios.get(BASE_URL + '/' + bugId + '/remove')
}

async function save(bug) {
    var queryStr = `/save?title=${bug.title}&severity=${bug.severity}&description=${bug.description}`    
	if (bug._id) queryStr += `&_id=${bug._id}`

    const res = await axios.get(BASE_URL + queryStr)
    return res.data
}

function getDefaultFilter() {
	return { title: '', severity: '' }
}