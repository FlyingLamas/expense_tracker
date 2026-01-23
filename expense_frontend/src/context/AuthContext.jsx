import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const login = (tokens) => {
        setAuthTokens(tokens);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setAuthTokens(null);
        setIsAuthenticated(false);
    };

    const value = {
        authTokens,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}
