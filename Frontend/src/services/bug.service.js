import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug/'

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

    try{
        var {data:bugs} = await axios.get(BASE_URL, { params: filterBy })
        return bugs
    }
    catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function getById(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId)
        return bug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function remove(bugId) {
    const url = BASE_URL + bugId
    try {
        const { data } = await axios.delete(url)
        return data
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function save(bug) {
    try{
        if (bug._id){
            const { data: savedBug } = await axios.put(BASE_URL + bug._id, bug)
            return savedBug
        }
        else {
            const { data: savedBug } = await axios.post(BASE_URL, bug)
            return savedBug
        }
        
    }
    catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getDefaultFilter() {
    return {
        title: '',
        severity: 0,
        pageIdx: undefined,
        sortBy: 'createdAt', 
        sortDir: 'asc' 
    }
}