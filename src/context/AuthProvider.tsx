
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./Auth_Context";


import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import {
  refreshAccessToken,
  setAccessToken as setApiAccessToken,
} from "../api/axios";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [accessToken, setAccessToken] =
    useState<string | null>(null);

  const [isRestoringSession, setIsRestoringSession] =
    useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const newAccessToken =
          await refreshAccessToken();

        setAccessToken(newAccessToken);
      } catch {
        setAccessToken(null);
        setApiAccessToken(null);
      } finally {
        setIsRestoringSession(false);
      }
    };

    restoreSession();
  }, []);

  const isAuthenticated = !!accessToken;

  const {
    data: user = null,
    isLoading: isUserLoading,
  } = useCurrentUser(isAuthenticated);

  const isLoading =
    isRestoringSession ||
    (isAuthenticated && isUserLoading);

  const login = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    setApiAccessToken(newAccessToken);
  };

  const logout = () => {
    setAccessToken(null);
    setApiAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        accessToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

