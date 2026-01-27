import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem("authTokens");
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("authTokens") ? true : false;
    });

    const login = (tokens) => {
        setAuthTokens(tokens);
        setIsAuthenticated(true);
        localStorage.setItem("authTokens", JSON.stringify(tokens));
    };

    const logout = () => {
        setAuthTokens(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authTokens");
    };

    const value = {
        authTokens,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}