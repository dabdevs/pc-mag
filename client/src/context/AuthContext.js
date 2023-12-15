const { createContext, useContext, useState } = require("react");

const AuthContext = createContext(undefined)
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) || undefined)

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext