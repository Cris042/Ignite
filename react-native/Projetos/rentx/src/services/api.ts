import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.10.202.247:3333'
})

export { api };