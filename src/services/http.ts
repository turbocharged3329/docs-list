import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://test-app-csm.up.railway.app',
})

export default instance
