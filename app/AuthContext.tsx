"use client";

import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import loginFn from "./utils/login";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type IProps = {
  children: ReactNode;
};

export const AuthProvider = (props: IProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginFn({ email, password });
      if (response.session?.access_token) {
        setIsAuthenticated(true);
        Cookies.set("token", response.session?.access_token);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("token");
    router.push("/");
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(Boolean(token));

    if (token && pathname.includes("login")) router.push("/admin/dashboard");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
      {...props}
    />
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
