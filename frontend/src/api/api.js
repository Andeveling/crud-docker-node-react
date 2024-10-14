import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4010",
})

export default api