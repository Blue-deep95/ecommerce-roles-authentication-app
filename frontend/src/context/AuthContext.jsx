import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    function login(data) {
        setUser(data.user)
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("role", data.user.role)
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }


    return (
        <AuthContext.Provider
            value={{ user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}