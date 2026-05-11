import { api } from "../../../services/api/apiClient";

import {
    getMockUsers,
    saveMockUsers,
} from "../mock/mockStorage";

import {
    LoginResponse,
    AuthResponse,
    AuthUser,
} from "../types/authTypes";

const MOCK_ENABLED =
    import.meta.env.VITE_ENABLE_MOCK_AUTH === "true";

export const register = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {

    if (MOCK_ENABLED) {

        const users = getMockUsers();

        const alreadyExists = users.some(
            (user) => user.email === email
        );

        if (alreadyExists) {
            throw new Error("Email já cadastrado");
        }

        users.push({
            id: Date.now(),
            name,
            email,
            password,
            role: "USER",
        });

        saveMockUsers(users);

        return {
            token: "mock-token",
            id: users[users.length - 1].id,
            name,
            email,
            role: "USER",
        };
    }

    const response = await api.post<AuthResponse>(
        "/auth/register",
        {
            name,
            email,
            password,
        }
    );

    return response.data;
};

export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {

    // MOCK LOGIN
    if (MOCK_ENABLED) {
        const users = getMockUsers();

        const mockUser = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (mockUser) {
            return {
                token: "mock-token-dev",
                id: mockUser.id,
                name: mockUser.name,
                email: mockUser.email,
                role: mockUser.role,
            };
        }

        throw new Error("Usuário ou senha inválidos");
    }

    // BACKEND REAL
    const response = await api.post<AuthResponse>(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};

export const requestOtp = async (
    email: string
) => {

    const response = await api.post(
        "/auth/otp/request",
        {
            email,
        }
    );

    return response.data;
};

export const validateOtp = async (
    email: string,
    code: string
) => {

    const response = await api.post(
        "/auth/otp/validate",
        {
            email,
            code,
        }
    );

    return response.data;
};
