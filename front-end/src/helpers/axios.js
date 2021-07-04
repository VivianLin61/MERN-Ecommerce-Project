import axios from 'axios'

const token = window.localStorage.getItem('token')
console.log(token)
const instance = axios.create({
  // baseURL: 'http://localhost:2000/api',
  baseUrl: 'https://ecommerce-back-end-server.herokuapp.com/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
})

export default instance
