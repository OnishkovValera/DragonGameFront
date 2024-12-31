import axios from 'axios'
import {useUserStore} from "../store/globalStore.ts";
const setAuthorized = useUserStore.getState().setAuthorized

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    timeout: 5000
})


api.interceptors.request.use((config) => {
    const token: string | null = localStorage.getItem("token")
    if(token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }else{
        setAuthorized(false)
    }

    return config
})

api.interceptors.response.use((response) => {
    if(response.status == 401){
        setAuthorized(false)
        localStorage.removeItem("token")
    }

    return response
})

