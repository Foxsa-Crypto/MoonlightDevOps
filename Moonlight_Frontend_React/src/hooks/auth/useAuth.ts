import { createContext, useContext } from "react";
import type { AuthUser } from "../../@types";

export type AuthContextType = {
    user: AuthUser | null;
    token: string | null;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);