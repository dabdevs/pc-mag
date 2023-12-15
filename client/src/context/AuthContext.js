import { useJwt } from "react-jwt";

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext(undefined)
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null)
    const { decodedToken, isExpired } = useJwt(token || '')
    const tokendIsExpired = isExpired

    const authUser = decodedToken ? decodedToken.user : null
    console.log('Authenticated user:', authUser)
 
    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            user, 
            setUser,
            authUser, 
            tokendIsExpired, 
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext