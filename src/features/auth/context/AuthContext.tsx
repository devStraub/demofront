import {
    createContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { login } from "../services/authService";

import {
    AuthUser,
    AuthResponse,
} from "../types/authTypes";

interface AuthContextData {
    token: string | null;
    user: AuthUser | null;

    signIn: (
        email: string,
        password: string
    ) => Promise<void>;

    signInWithToken: (
        data: AuthResponse
    ) => void;

    logout: () => void;

    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext =
    createContext({} as AuthContextData);

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(null);

    const [user, setUser] =
        useState<AuthUser | null>(null);

    // RECUPERA SESSÃO
    useEffect(() => {
        const storedToken =
            localStorage.getItem("token");

        const storedUser =
            localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const signInWithToken = (
        data: AuthResponse
    ) => {

        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
        };

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(data.token);

        setUser(user);
    };

    const signIn = async (
        email: string,
        password: string
    ) => {
    
        const data = await login(
            email,
            password
        );
    
        signInWithToken(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                signIn,
                signInWithToken,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};