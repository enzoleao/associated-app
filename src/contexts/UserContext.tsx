"use client";

import { logoutAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  initials: string
  color: string | null
  role: {
    id: string;
    name: string;
  };
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false)
  }, []);

  function login(userData: User) {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { path: "/", expires: 7 });
  }

  async function logout() {
    await logoutAction();
    setUser(null);
    Cookies.remove("user", { path: "/" });
    router.push("/auth/login");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
