import { api } from "../../../services/apiClient";

import { MOCK_USERS } from "../mock/mockUsers";

import {
    LoginResponse,
    AuthUser,
} from "../types/authTypes";

const MOCK_ENABLED =
    import.meta.env.VITE_ENABLE_MOCK_AUTH === "true";

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {

    // MOCK LOGIN
    if (MOCK_ENABLED) {
        const mockUser = MOCK_USERS.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (mockUser) {
            const authUser: AuthUser = {
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
                role: mockUser.role,
            };

            return {
                token: "mock-token-dev",
                user: authUser,
            };
        }

        throw new Error("Usuário ou senha inválidos");
    }

    // BACKEND REAL
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};