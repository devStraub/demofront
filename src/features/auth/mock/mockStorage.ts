import { AuthUser } from "../types/authTypes";

export interface MockUser extends AuthUser {
    password: string;
}

const STORAGE_KEY = "mock_users";

const DEFAULT_USERS: MockUser[] = [
    {
        id: 1,
        name: "Super Usuário",
        email: "desenv@desenv.com",
        password: "123456",
        role: "ADMIN",
    },
];

export const getMockUsers = (): MockUser[] => {

    const stored =
        localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEFAULT_USERS)
        );

        return DEFAULT_USERS;
    }

    return JSON.parse(stored);
};

export const saveMockUsers = (
    users: MockUser[]
) => {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(users)
    );
};