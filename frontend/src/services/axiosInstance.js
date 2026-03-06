import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:2000/api",
    withCredentials: true
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Way to handle refreshing access tokens
instance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config
        if (error.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            await axios.post("http://localhost:2000/api/seller/regenerate-access-token", {},
                { withCredentials: true }
            )
                .then(res => {
                    localStorage.setItem("token", res.data.accessToken)
                    originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                    return instance(originalRequest)

                })
                .catch(err => {
                    // log the user out
                    localStorage.removeItem("token")
                    window.location.href("/login")
                })
        }
        return Promise.reject(error);
    }
)



export default instance