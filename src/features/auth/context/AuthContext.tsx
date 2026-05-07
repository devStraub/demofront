import { createContext, useState, useEffect } from "react";

import { login } from "../services/authService";
import { AuthUser } from "../types/authTypes";

interface AuthContextData {
    user: any;
    token: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        const data = await login(email, password);

        localStorage.setItem("token", data.token);

        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};