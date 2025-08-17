import Axios from 'axios'

var axios = Axios.create({
  withCredentials: true,
})

export const userService = {
  query,
  remove,
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  getEmptyCredentials
}

const BASE_URL = '//localhost:3030/api/user/'

function query() {
  return axios.get(BASE_URL).then(res => res.data)
}

function remove(userId) {
  return axios.delete(BASE_URL + userId)
    .then(res => res.data)
}

function getLoggedinUser() {
  const user = JSON.parse(sessionStorage.getItem('loggedinUser'))
  return user
}

function login(credentials) {
  return axios.post(BASE_URL+'login', credentials)
    .then(res => res.data)
    .then(user => {
      console.log('user:', user)
      const miniUser = { username: user.username, isAdmin: user.isAdmin, _id: user._id }
      sessionStorage.setItem('loggedinUser', JSON.stringify(miniUser))
      return user
    })
}

function logout() {
  return axios.post(BASE_URL+'logout')
    .then(() => sessionStorage.removeItem('loggedinUser'))
}

function getById(userId) {
  return axios.get(BASE_URL+userId).then(res => res.data)
}

function signup(credentials) {
  return axios.post(BASE_URL + 'signup', credentials)
    .then(res => res.data)
    .catch(err => {
      console.log(err.response.data)
      throw err
    })
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: ''
  }
}


