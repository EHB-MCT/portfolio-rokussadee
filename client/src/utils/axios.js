import axios from "axios";

//const apiUrl = process.env.REACT_APP_API_URL

const apiUrl = 'http://localhost:3000'

const instance = axios.create({
  baseURL: apiUrl
})

export default instance
