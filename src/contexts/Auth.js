import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
     const [logged, setLogged] = useState(false);
    return (
        <AuthContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider