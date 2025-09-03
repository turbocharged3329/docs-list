import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.response.use(
  (response) => response,
  function (error) {
    toast.error(`${error.code} - ${error.message}`)

    return Promise.reject(error)
  },
)

export default instance
