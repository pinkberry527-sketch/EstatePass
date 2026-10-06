
import { createContext } from "react";

import type { CurrentUser } from "../types/auth";

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  user: CurrentUser | null;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

