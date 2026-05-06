import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export type AuthData = {
  claims?: Record<string, any> | null;
  user?: User | null;
  profile?: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  claims: undefined,
  user: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
